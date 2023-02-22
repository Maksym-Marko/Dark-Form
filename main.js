'use strict'

const FinalStep = ({ steps }) => {

    const [data, setData] = React.useState([])

    const prepareData = () => {

        let elements = []

        steps.forEach(el => {

            for (const [key, value] of Object.entries(el)) {
                elements.push(value)
            }

        })

        setData(elements)

    }

    React.useEffect(() => {
        prepareData()
    }, [])

    return (
        <div>
            <h2>Great! Your data:</h2>
            <ul>
                {
                    data.map(el => <li>{el}</li>)
                }
            </ul>
        </div>
    )
}

const StepTwo = ({ setStep, steps }) => {

    const step = 1

    const handleData = (e) => {
        setStep(step, e.target.name, e.target.value)
    }

    return (
        <>
            <h2>Favorite Things</h2>

            <div class="mb-3">
                <label class="form-label">Favorite Color</label>
                <input
                    type="text"
                    name="favoriteColor"
                    class="form-control"
                    onChange={handleData}
                    value={steps[step].favoriteColor}
                />
            </div>

            <div class="mb-3">
                <label class="form-label">Favorite Pet</label>
                <input
                    type="text"
                    name="favoritePet"
                    class="form-control"
                    onChange={handleData}
                    value={steps[step].favoritePet}
                />
            </div>

            <div class="mb-3">
                <label class="form-label">Favorite Game</label>
                <input
                    type="text"
                    name="favoriteGame"
                    class="form-control"
                    onChange={handleData}
                    value={steps[step].favoriteGame}
                />
            </div>

        </>

    )
}

const StepOne = ({ setStep, steps }) => {

    const step = 0

    const handleData = (e) => {
        setStep(step, e.target.name, e.target.value)
    }

    return (
        <>
            <h2>Personal Data</h2>

            <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                    onChange={handleData}
                    value={steps[step].name}
                />
            </div>

            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    name="email"
                    class="form-control"
                    onChange={handleData}
                    value={steps[step].email}
                />
            </div>
        </>

    )
}

const Form = () => {

    const [steps, setSteps] = React.useState([
        {
            name: null,
            email: null,
        },
        {
            favoriteColor: null,
            favoritePet: null,
            favoriteGame: null,
        },
    ])

    const [availableStep, setAvailableStep] = React.useState(0)
    const [currentStep, setCurrentStep] = React.useState(0)

    const handleSteps = (step, name, value) => {

        setSteps(prev => prev.map((el, i) => {
            if (i === step) {
                el[name] = value
            }
            return el
        }))

    }

    const prepareSteps = () => {

        steps.forEach((el, i) => {

            let rowIsValid = false

            for (const [key, value] of Object.entries(el)) {

                if (!value) {

                    rowIsValid = false
                    break

                } else {

                    rowIsValid = true

                }

            }

            if (rowIsValid) {

                setAvailableStep(i + 1)

            } else {

                return

            }

        })

    }

    React.useEffect(() => {

        prepareSteps()

    }, [steps])

    const components = [
        (setStep, steps) => <StepOne setStep={setStep} steps={steps} />,
        (setStep, steps) => <StepTwo setStep={setStep} steps={steps} />,
        (setStep, steps) => <FinalStep steps={steps} />,
    ]

    const prevStep = (e) => {

        e.preventDefault()

        if (currentStep > 0) {

            setCurrentStep(prev => prev - 1)

        }

    }

    const nextStep = (e) => {

        e.preventDefault()

        if (currentStep < availableStep) {
            setCurrentStep(prev => prev + 1)
        }

    }

    return (
        <div class="d-flex justify-content-between mx-auto mt-5 p-5 border border-dark w-50">
            
            <form class="w-100">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">

                        {
                            components.map( ( el, i ) => {

                                return <li 
                                    class={
                                        currentStep === i ? 
                                        "breadcrumb-item fs-5 text-decoration-underline text-primary" :
                                        "breadcrumb-item fs-5"
                                    }
                                >Step {i+1}</li>

                            } )
                        }
        
                    </ol>
                </nav>

                {components[currentStep](handleSteps, steps)}

                <div class="w-100 d-flex justify-content-between">

                    {
                        currentStep > 0 ?
                            <button
                                onClick={prevStep}
                                class="btn btn-secondary"
                            >Prev</button> :
                            ''
                    }

                    {
                        components.length - 1 === currentStep ?
                            '' :
                            <button
                                onClick={nextStep}
                                class={
                                    currentStep < availableStep ?
                                        "btn btn-primary" :
                                        "btn btn-primary disabled"
                                }
                            >Next</button>
                    }

                </div>

            </form>

        </div>
    )

}

const anotherRootNode = document.getElementById('root')
const anotherRoot = ReactDOM.createRoot(anotherRootNode)
anotherRoot.render(React.createElement(Form))