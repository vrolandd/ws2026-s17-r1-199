import maximize from './assets/maximize.svg'
import check from './assets/check.svg'
import InformationsScreen from './screens/1_Informations'
import FloorPlanScreen from './screens/2_Floorplan'
import { Dispatch, ReactElement, SetStateAction, useState } from 'react'

function GetScreen({ page, nextAllowed }: { page: number, nextAllowed: Dispatch<SetStateAction<() => boolean>> }): ReactElement {
    switch (page) {
        case 0:
            return <InformationsScreen nextAllowed={nextAllowed} />
        case 1:
            return <FloorPlanScreen nextAllowed={nextAllowed} />
        default:
            return <p>Nincs ilyen screen.</p>
    }
}

export default function App() {
    const [ page, setPage ] = useState<number>(1);

    const [ nextAllowed, setNextAllowed ] = useState<() => boolean>(() => () => false);

    return (
        <article className="container">
            <header className="header">
                <h1>Register a new location</h1>
                <div className="steps">
                    {
                        [0, 1, 2, 3].map((step) => (
                            <>
                            <button
                                onClick={() => { setPage(step) }}
                                className={`step ${page > step ? 'done' : page == step ? 'current' : ''}`}
                                disabled={page < step}
                            >
                                {
                                    page > step ? <img src={check} alt="Check" /> : step + 1
                                }
                            </button>

                            { step < 3 && <div className="step-divider"></div> }
                            </>
                        ))
                    }
                </div>

                <button className="fullscreen-btn">
                    <img src={maximize} alt="Maximize" />
                </button>
            </header>

            <GetScreen nextAllowed={setNextAllowed} page={page} />


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
        </article>
    );
}
