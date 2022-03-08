import cn from "classnames";
import styles from '../styles/Box.module.css';

const Box = () => {
    return (
        <main className="bg-blue h-screen w-full">
            <div className={cn(styles.box, "max-w-2xl w-2xl min-w-2xl rounded overflow-hidden relative h-[64rem] bg-white drop-shadow-2xl saturate-200 brightness-90 backdrop-blur-lg mx-auto")}>
                <div className=" h-48 w-48 z-10 absolute -right-16 top-32 rounded-xl bg-black rotate-45 transform origin-bottom-left shadow-inner"></div>

                <div className="absolute z-0 inset-x-0 bottom-96 h-16 bg-yellow bg-gradient-to-r from-yellow-light via-yellow to-yellow-dark shadow-lg shadow-current/30 transform -skew-y-6"></div>
                <div className="absolute z-0 inset-x-0 bottom-80 h-16 bg-orange bg-gradient-to-r from-orange-light via-orange to-orange-dark shadow-lg shadow-current/30 transform -skew-y-6"></div>
                <div className="absolute z-0 inset-x-0 bottom-64 h-16 bg-red bg-gradient-to-r from-red-light via-red to-red-dark shadow-lg shadow-current/30 transform -skew-y-6"></div>
                <div className="absolute z-0 inset-x-0 bottom-48 h-16 bg-magenta bg-gradient-to-r from-magenta-light via-magenta to-magenta-dark shadow-lg shadow-current/30 transform -skew-y-6"></div>
                <div className="absolute z-0 inset-x-0 bottom-32 h-16 bg-purple bg-gradient-to-r from-purple-light via-purple to-purple-dark shadow-lg shadow-current/30 transform -skew-y-6"></div>

                <h1 className="absolute z-10 top-48 left-40 w-24 text-8xl tracking-wide -rotate-12 text-red">Matt Gibbs</h1>
                <h3 className="absolute z-10 left-5 font-extrabold text-2xl bottom-[33rem] text-black whitespace-nowrap">Software Developer</h3>
                <h3 className="absolute z-10 left-5 font-extrabold text-6xl bottom-[29rem] text-black whitespace-nowrap">TS-4.5</h3>

                <div className="px-6 py-4">
                    <div className="absolute bottom-3 left-5 font-bold text-xs mb-2">Made with ❤️</div>
                </div>
            </div>
        </main>
    )
}

export default Box;