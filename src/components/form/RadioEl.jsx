export default function RadioEl({}){
    const container = `border border-indigo-700 rounded-lg p-2`
    const legend = `ml-1 font-semibold`
    const div = `flex justify-evenly items-center`
    const label = ``
    const input = `mr-1`
    return(
        <fieldset className={container}>
            <legend className={legend}>Select your role</legend>
            <div className={div}>
                <label className={label}>
                    <input className={input} type="radio" name="account_type" value="admin" required />
                    Admin
                </label>
                <label className={label}>
                    <input className={input} type="radio" name="account_type" value="rep" required />
                    Sales rep
                </label>
            </div>
        </fieldset>
    )
}