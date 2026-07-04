import React from 'react';
import cn from 'classnames';
import { IFleetAgent } from './model/fleet-agent';

interface AiOpsProps {
    agents: readonly IFleetAgent[];
}

const AiOps = ({ agents }: AiOpsProps): React.ReactNode => {
    const activeCount = agents.filter(a => a.status === 'ACTIVE').length;

    return (
        <div className="w-full max-w-6xl mx-auto grid gap-12 lg:gap-10 lg:grid-cols-[2fr,3fr] items-start">

            {/* Doctrine — the human side */}
            <div className="relative px-4 sm:px-0">
                <p className="font-mono text-lg text-faded-cardboard leading-relaxed">
                    I operate a fleet.
                    <br />
                    <br />
                    Agents design, build, and ship alongside me. They type faster
                    than I ever will, and they never get precious about a rewrite.
                    My job is direction: set the taste, draw the guardrails, review
                    everything that ships.
                </p>

                <p className="font-mono text-sm text-phosphor-amber/90 mt-6">
                    {'//'} receipts: this section — and most of this redesign —
                    was built by PID 001 while I watched the diffs.
                </p>

                {/* The human hand — marker against the machine */}
                <p className="lazer84 text-2xl sm:text-3xl text-faded-cardboard mt-10 -rotate-3 origin-left" aria-label="the taste is still mine">
                    the taste is still mine
                </p>

                {/* The one hot element in this view */}
                <div className="inline-block mt-10 -rotate-2">
                    <span className="heavitas text-sm sm:text-base text-tracking-red font-bold tracking-widest bg-magnetic-black border-4 border-tracking-red px-4 py-2 shadow-[6px_6px_0px_0px_#3B5C7D] inline-block">
                        [✓] HUMAN_IN_THE_LOOP
                    </span>
                </div>
            </div>

            {/* Fleet process table — the machine side */}
            <div className="relative w-full overflow-hidden border-2 border-phosphor-amber/30 hover:border-phosphor-amber/60 rounded-sm bg-magnetic-black/90 backdrop-blur-sm transition-all duration-500 rotate-0 lg:rotate-1">
                {/* Header */}
                <div className="bg-phosphor-amber/10 border-b border-phosphor-amber/30 px-4 py-1.5 flex justify-between items-center bg-gradient-to-r from-phosphor-amber/5 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                        <span className="text-[10px] font-mono text-phosphor-amber uppercase tracking-[0.2em] font-bold">
                            Fleet_Control // $ ps --fleet
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-faded-cardboard/60 tracking-tighter">
                        SUPERVISION: MANUAL
                    </div>
                </div>

                {/* Process table */}
                <div className="p-4 bg-black/40 overflow-x-auto">
                    <table className="w-full font-mono text-[11px] md:text-xs text-left border-collapse">
                        <caption className="sr-only">
                            The agent fleet: AI agents, personas, and bots that operate on Matt&apos;s systems
                        </caption>
                        <thead>
                            <tr className="text-phosphor-amber/80 uppercase tracking-wider">
                                <th scope="col" className="pb-2 pr-3 font-normal">PID</th>
                                <th scope="col" className="pb-2 pr-3 font-normal">Agent</th>
                                <th scope="col" className="pb-2 pr-3 font-normal hidden sm:table-cell">Host</th>
                                <th scope="col" className="pb-2 font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map((agent) => (
                                <tr key={agent.pid} className="border-t border-phosphor-amber/10 align-top hover:bg-phosphor-amber/5 transition-colors">
                                    <td className="py-2 pr-3 text-faded-cardboard/70">{agent.pid}</td>
                                    <td className="py-2 pr-3">
                                        <span className="text-faded-cardboard font-bold">{agent.name}</span>
                                        <span className="block text-faded-cardboard/70">{agent.role}</span>
                                        <span className="block sm:hidden text-chrome-blue">@{agent.host}</span>
                                    </td>
                                    <td className="py-2 pr-3 hidden sm:table-cell text-chrome-blue">{agent.host}</td>
                                    <td className="py-2 whitespace-nowrap">
                                        <span className={cn(
                                            "inline-block w-2 h-2 rounded-full mr-1.5",
                                            agent.status === 'ACTIVE'
                                                ? "bg-emerald-500 shadow-[0_0_5px_#10b981] animate-pulse motion-reduce:animate-none"
                                                : "bg-phosphor-amber/50"
                                        )} />
                                        <span className={agent.status === 'ACTIVE' ? "text-emerald-500" : "text-phosphor-amber/80"}>
                                            {agent.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center gap-1 mt-3 font-mono text-xs text-phosphor-amber">
                        <span className="opacity-40">{'>'}</span>
                        <div className="w-2 h-4 bg-phosphor-amber/60 animate-cursor motion-reduce:animate-none" />
                    </div>
                </div>

                {/* Bottom status bar */}
                <div className="px-4 py-1 border-t border-phosphor-amber/10 flex justify-between items-center bg-black/20">
                    <div className="text-[9px] font-mono text-phosphor-amber/70">
                        {agents.length} PROCESSES // <span className="text-emerald-500/80">{activeCount} ACTIVE</span>
                    </div>
                    <div className="text-[9px] font-mono text-phosphor-amber/60 italic">
                        OPERATOR: MATT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiOps;
