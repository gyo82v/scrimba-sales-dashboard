export default function RadioEl({}){
    const container = ``
    const legend = ``
    const div = ``
    const label = ``
    const input = ``
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