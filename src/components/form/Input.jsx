export default function Input({type = "text", name, placeholder = "", label, error, isPending}){
    const styleInput = `transition-transform transition-colors transition-shadow duration-300 ease-in-out
                        p-2 font-semibold bg-indigo-100 rounded-lg text-indigo-700 border border-indigo-100
                        shadow-lg shadow-indigo-700/30 focus:shadow-xl 
                        hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 
                        focus:bg-indigo-200 placeholder-indigo-500 focus:scale-105`
    const labelStyle = `text-indigo-700 font-semibold text-lg`
    const div = `flex flex-col gap-2`
    return(
      <div className={div}>
        <label htmlFor={name} className={labelStyle}>{label}</label>
          <input 
            className={styleInput}
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "form error" : undefined}
            disabled={isPending}
          />
      </div>
    )
}