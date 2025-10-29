export default function Input({type = "text", name, placeholder = "", label, error, isPending}){
    const styleInput = ``
    const labelStyle = ``
    return(
        <label htmlFor={name} className={labelStyle}>
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
          {label}
        </label>
    )
}