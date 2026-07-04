import React, { useEffect, useMemo, useRef } from 'react';
import useSWR from 'swr';
import { IProject } from './model/project';
import { IRepoStar, IStarCatalog } from './model/repo-star';
import { PROJECT_RELATIONS } from '../../data';

interface StarChartProps {
    projects: readonly IProject[];
    catalog: IStarCatalog;
    current: number;
    isOffline: boolean;
    className?: string;
}

const AMBER = '#FFB000', ORANGE = '#FF4400', BLUE = '#3B5C7D', CARD = '#F5F0E1', RED = '#D93636';
const PITCH = 0.52; // camera tilt so rings render as ellipses (DESIGN.md §2)

const hash = (s: string) => {
    let h = 2166136261;
    for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967295;
};

const publicRepoFetcher = (url: string) =>
    fetch(url).then(res => {
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        return res.json();
    });

// The site's data pattern: the build bakes a cached catalog, then the
// client live-updates from PUBLIC GitHub data (same as SystemLogs).
// On any fetch failure the baked catalog keeps the chart lit. The
// private-contact count is build-time only — no token in the browser.
const useLiveCatalog = (baked: IStarCatalog): IStarCatalog => {
    const { data } = useSWR(
        'https://api.github.com/users/mtgibbs/repos?per_page=100&type=owner',
        publicRepoFetcher,
        { refreshInterval: 5 * 60 * 1000, revalidateOnFocus: false }
    );

    return useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) return baked;
        const repos: IRepoStar[] = data.map((r: any) => ({
            name: r.name,
            createdYear: new Date(r.created_at).getFullYear(),
            pushedAt: r.pushed_at,
            sizeKb: r.size,
            fork: r.fork,
        }));
        return { repos, privateCount: baked.privateCount };
    }, [data, baked]);
};

interface IBody {
    name: string | null;
    pos: [number, number, number];
    bright: number;
    dot: number;
    fork: boolean;
    classified: boolean;
    targetIndex: number; // -1 for ambient stars
}

// The NAV star chart (DESIGN.md §2): every repo is a body in 3D space.
// Position is diegetic — created-year sets the orbital shell, name-hash
// the azimuth, push-recency the brightness, repo size the dot radius.
// The deck owns selection; this chart just zooms-to-lock on `current`.
const StarChart = ({ projects, catalog: bakedCatalog, current, isOffline, className }: StarChartProps) => {
    const catalog = useLiveCatalog(bakedCatalog);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({ rot: 0.6, zoom: 1, zoomT: 1, ox: 0, oy: 0, lock: 0, locking: false, sel: 0, pulse: 0, offline: false });

    const bodies = useMemo<IBody[]>(() => {
        const yearNorm = (y: number) => Math.max(0, Math.min(1, (y - 2013) / (new Date().getFullYear() - 2013)));
        const recency = (p: string) => {
            const y = new Date(p).getFullYear() + new Date(p).getMonth() / 12;
            return Math.max(0, Math.min(1, (y - 2014) / (new Date().getFullYear() + 0.5 - 2014)));
        };
        const pinnedNames = new Set(projects.map(p => p.title));

        const make = (name: string, year: number, bright: number, sizeKb: number, fork: boolean, targetIndex: number): IBody => {
            const h1 = hash(name), h2 = hash(name + '*');
            const radius = 0.25 + yearNorm(year) * 0.72;
            const theta = h1 * Math.PI * 2;
            return {
                name, fork, classified: false, targetIndex,
                pos: [Math.cos(theta) * radius, (h2 - .5) * 0.5, Math.sin(theta) * radius],
                bright,
                dot: Math.max(1.1, Math.min(2.4, Math.log10(Math.max(sizeKb, 2)) * 0.8)) + (targetIndex >= 0 ? 1.6 : 0),
            };
        };

        const out: IBody[] = [];
        // pinned projects — the navigable targets
        projects.forEach((p, i) => {
            const rec = catalog.repos.find(r => r.name === p.title);
            out.push(make(p.title, Number(p.year) || rec?.createdYear || 2020, 0.95, rec?.sizeKb ?? 500, false, i));
        });
        // ambient stars — the rest of the public catalog
        catalog.repos.filter(r => !pinnedNames.has(r.name)).forEach(r => {
            out.push(make(r.name, r.createdYear, 0.22 + recency(r.pushedAt) * 0.68, r.sizeKb, r.fork, -1));
        });
        // classified contacts — private repos, count only
        for (let i = 0; i < catalog.privateCount; i++) {
            const h1 = hash('classified-' + i), h2 = hash('classified*' + i);
            const radius = 0.45 + h2 * 0.45;
            const theta = h1 * Math.PI * 2;
            out.push({
                name: null, fork: false, classified: true, targetIndex: -1,
                pos: [Math.cos(theta) * radius, (hash('y' + i) - .5) * 0.5, Math.sin(theta) * radius],
                bright: 0.7, dot: 1.7,
            });
        }
        return out;
    }, [projects, catalog]);

    const links = useMemo(() =>
        PROJECT_RELATIONS
            .map(([a, b]) => [bodies.find(x => x.name === a), bodies.find(x => x.name === b)])
            .filter((p): p is [IBody, IBody] => Boolean(p[0] && p[1])),
        [bodies]);

    // selection changes ride in via ref so the rAF loop isn't re-created
    useEffect(() => {
        const st = stateRef.current;
        st.sel = current;
        st.offline = isOffline;
        if (!isOffline) { st.locking = true; st.lock = 0; st.zoomT = 1.45; }
        else { st.locking = false; st.lock = 0; st.zoomT = 1; }
    }, [current, isOffline]);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const st = stateRef.current;
        let W = 0, H = 0, CX = 0, CY = 0, raf = 0, prev = performance.now();

        const resize = () => {
            const r = cv.parentElement!.getBoundingClientRect();
            cv.width = W = Math.max(1, Math.floor(r.width * devicePixelRatio));
            cv.height = H = Math.max(1, Math.floor(r.height * devicePixelRatio));
            CX = W / 2; CY = H / 2;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(cv.parentElement!);

        const S = () => Math.min(W, H) * 0.44;
        const project = (p: readonly [number, number, number]) => {
            const [x, y, z] = p;
            const xr = x * Math.cos(st.rot) + z * Math.sin(st.rot);
            const zr = -x * Math.sin(st.rot) + z * Math.cos(st.rot);
            const yp = y * Math.cos(PITCH) - zr * Math.sin(PITCH);
            const zp = y * Math.sin(PITCH) + zr * Math.cos(PITCH);
            const k = 1.9 / (1.9 + zp);
            return { sx: CX + st.ox + xr * S() * st.zoom * k, sy: CY + st.oy + yp * S() * st.zoom * k, depth: zp, k };
        };

        const ring = (r: number, color: string, dash?: number[]) => {
            const px = devicePixelRatio;
            ctx.beginPath();
            for (let a = 0; a <= 60; a++) {
                const t = a / 60 * Math.PI * 2;
                const p = project([Math.cos(t) * r, 0, Math.sin(t) * r]);
                a ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy);
            }
            ctx.strokeStyle = color; ctx.lineWidth = px;
            ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
        };

        const draw = () => {
            const px = devicePixelRatio;
            ctx.clearRect(0, 0, W, H);
            const dim = st.offline ? 0.35 : 1;

            ring(0.97, `rgba(59,92,125,${.6 * dim})`);
            ring(0.62, `rgba(59,92,125,${.35 * dim})`, [3 * px, 4 * px]);

            // center datum
            const o = project([0, 0, 0]);
            ctx.strokeStyle = `rgba(245,240,225,${.45 * dim})`; ctx.lineWidth = px;
            ctx.beginPath();
            ctx.moveTo(o.sx - 6 * px, o.sy); ctx.lineTo(o.sx - 2 * px, o.sy);
            ctx.moveTo(o.sx + 2 * px, o.sy); ctx.lineTo(o.sx + 6 * px, o.sy);
            ctx.moveTo(o.sx, o.sy - 6 * px); ctx.lineTo(o.sx, o.sy - 2 * px);
            ctx.moveTo(o.sx, o.sy + 2 * px); ctx.lineTo(o.sx, o.sy + 6 * px);
            ctx.stroke();

            // uplink signals
            links.forEach(([a, b], li) => {
                const pa = project(a.pos), pb = project(b.pos);
                ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy);
                ctx.strokeStyle = `rgba(255,176,0,${.14 * dim})`; ctx.lineWidth = px;
                ctx.setLineDash([2 * px, 4 * px]); ctx.stroke(); ctx.setLineDash([]);
                if (!st.offline) {
                    const t = (st.pulse + li * 0.5) % 1;
                    ctx.beginPath();
                    ctx.arc(pa.sx + (pb.sx - pa.sx) * t, pa.sy + (pb.sy - pa.sy) * t, 1.4 * px, 0, Math.PI * 2);
                    ctx.fillStyle = AMBER; ctx.globalAlpha = .8; ctx.fill(); ctx.globalAlpha = 1;
                }
            });

            // bodies, painter order
            const proj = bodies.map(b => ({ ...project(b.pos), b })).sort((a, z) => z.depth - a.depth);
            let selP: (typeof proj)[number] | undefined;
            proj.forEach(p => {
                const b = p.b;
                const isSel = !st.offline && b.targetIndex === st.sel;
                if (isSel) selP = p;
                const r = (isSel ? b.dot * 1.35 : b.dot) * p.k * px * 0.9;
                ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
                ctx.globalAlpha = Math.max(0.26, Math.min(1, (b.targetIndex >= 0 ? .95 : b.bright * .7) * (0.5 + p.k * 0.5))) * dim;
                if (b.classified) {
                    ctx.strokeStyle = RED; ctx.lineWidth = px * 0.8; ctx.stroke();
                } else {
                    ctx.fillStyle = isSel ? ORANGE : (b.fork ? BLUE : (st.offline ? RED : AMBER));
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            });

            // reticle + label on the selected body
            if (selP) {
                const g = (12 - st.lock * 4) * px;
                ctx.strokeStyle = st.lock >= 1 ? ORANGE : AMBER; ctx.lineWidth = px;
                ([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).forEach(([dx, dy]) => {
                    ctx.beginPath();
                    ctx.moveTo(selP!.sx + dx * g, selP!.sy + dy * g - dy * 4 * px);
                    ctx.lineTo(selP!.sx + dx * g, selP!.sy + dy * g);
                    ctx.lineTo(selP!.sx + dx * g - dx * 4 * px, selP!.sy + dy * g);
                    ctx.stroke();
                });
                if (st.lock >= 1 && selP.b.name) {
                    ctx.font = `bold ${8 * px}px "Nineteen Ninety Seven", monospace`;
                    ctx.fillStyle = CARD;
                    ctx.fillText(selP.b.name.substring(0, 16).toUpperCase(), selP.sx - g, selP.sy - g - 5 * px);
                }
            }

            if (st.offline) {
                ctx.font = `bold ${9 * px}px "Nineteen Ninety Seven", monospace`;
                ctx.fillStyle = RED;
                ctx.fillText('NO_CARRIER', 10 * px, H - 10 * px);
            }
        };

        const tick = (now: number) => {
            const dt = Math.min((now - prev) / 1000, .05); prev = now;
            if (!reduced && !st.offline) {
                st.rot += dt * (st.lock >= 1 ? 0.03 : 0.07);
                st.pulse = (st.pulse + dt * 0.25) % 1;
            }
            st.zoom += (st.zoomT - st.zoom) * Math.min(1, dt * 3);
            if (st.locking) {
                st.lock = Math.min(1, st.lock + dt * 1.8);
                if (st.lock >= 1) st.locking = false;
            }
            // camera pans the locked body to center; drifts home offline
            const target = bodies.find(b => b.targetIndex === st.sel);
            if (target && !st.offline) {
                const t = project(target.pos);
                st.ox += (CX - t.sx) * Math.min(1, dt * 2.6);
                st.oy += (CY - t.sy) * Math.min(1, dt * 2.6);
            } else {
                st.ox += (0 - st.ox) * Math.min(1, dt * 2);
                st.oy += (0 - st.oy) * Math.min(1, dt * 2);
            }
            draw();
            raf = requestAnimationFrame(tick);
        };

        if (reduced) { st.lock = 1; st.zoom = 1.45; }
        raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, [bodies, links]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            role="img"
            aria-label={`Star chart of ${bodies.length} repositories; currently targeting ${projects[current]?.title || 'nothing'}`}
        />
    );
};

export default StarChart;
