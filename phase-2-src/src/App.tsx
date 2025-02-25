import maximize from './assets/maximize.svg'
import minimize from './assets/minimize.svg'
import check from './assets/check.svg'
import InformationsScreen from './screens/1_Informations'
import FloorPlanScreen from './screens/2_Floorplan'
import { Dispatch, Fragment, ReactElement, SetStateAction, useRef, useState } from 'react'
import ServicesScreen from './screens/3_Services'
import ExportScreen from './screens/4_Export'

function GetScreen({ page, nextAllowed }: { page: number, nextAllowed: Dispatch<SetStateAction<() => boolean>> }): ReactElement {
    return (
        <>
        <InformationsScreen nextAllowed={nextAllowed} visible={page == 0} />
        <FloorPlanScreen nextAllowed={nextAllowed} visible={page == 1}/>
        <ServicesScreen nextAllowed={nextAllowed} visible={page == 2}/>
        <ExportScreen nextAllowed={nextAllowed} visible={page == 3}/>
        
        <main className='main' style={{ display: (page < 0 || page > 3) ? 'flex' : 'none' }}><h2>Missing screen.</h2></main>
        </>
    )
}

export default function App() {
    const [ page, setPage ] = useState<number>(0);

    const [ nextAllowed, setNextAllowed ] = useState<() => boolean>(() => () => false);
    const [ inFullscreen, setInFullscreen ] = useState<boolean>(false);

    const containerRef = useRef<HTMLElement | null>(null);

    const fullScreenHandler = async() => {
        if (inFullscreen) {
            document.exitFullscreen()
        } else {
            await containerRef.current?.requestFullscreen()
        }

        setInFullscreen(!inFullscreen)
    }

    return (
        <article className="container" ref={containerRef}>
            <header className="header">
                <h1>Register a new location</h1>
                <div className="steps">
                    {
                        [0, 1, 2, 3].map((step) => (
                            <Fragment key={step}>
                                <button
                                    onClick={() => { setPage(step) }}
                                    className={`step ${page > step ? 'done' : page == step ? 'current' : ''}`}
                                    disabled={page < step}
                                >
                                    {
                                        page == 3 ? <img src={check} alt="Check" /> : step + 1
                                    }
                                </button>

                                { step < 3 && <div className="step-divider"></div> }
                            </Fragment>
                        ))
                    }
                </div>

                <button
                    onClick={fullScreenHandler}
                    className="fullscreen-btn"
                >
                    {
                        inFullscreen ? <img src={minimize} alt="Minimize" /> : <img src={maximize} alt="Maximize" />
                    }
                </button>
            </header>

            <GetScreen nextAllowed={setNextAllowed} page={page} />

            {
                page < 3 && (
                    <footer className="footer">
                        <button className="btn" disabled={page == 0} onClick={() => { setPage(page - 1) }}>
                            Back
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                if (nextAllowed()) {
                                    setPage(page + 1)
                                }
                            }}
                        >Next</button>
                    </footer>
                )
            }
            
        </article>
    );
}
