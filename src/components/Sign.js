import { useFormik } from "formik";
import * as Yup from "yup";

const formAStyle = {
  width: "clamp(238px,34vw,358px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: " auto",
};

const inputStyle = {
  backgroundColor: "inherit",
  color: "#FFF",
};


export const Sign = ({ title, buttonTitle, children, handleSubmit  }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Не заполнено"),
    password: Yup.string()
      .required("Не заполнено")
      .min(8, "Пароль слишком коротки")
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        "Пароль должен содержать только латинские буквы, хотя бы одну цифру, хотя бы одну заглавную букву и хотя бы один специальный символ"
      ),
  });


  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema,
    validateOnMount: true,
  });

  return (
    <section
      className="register"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={formAStyle}>
        <h2 style={{ textAlign: "center", marginBottom: '50px' }} className="form__name">
          {title}
        </h2>
        <div className="form__input-container" style={{ color: "white" }}>
          <input
            className={`form__input form__input_el_first`}
            name="email"
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            onBlur={formik.handleBlur}
            placeholder="Email"
            style={{
              ...inputStyle,
              borderBottom:
                formik.touched.email && formik.errors.email
                  ? "2px solid #F00"
                  : "2px solid #CCC",
            }}
          />
          <span className="form__input-error" id="place_name-input-error">
            {formik.touched.email && formik.errors.email}
          </span>
          <input
            className={`form__input form__input_el_second`}
            name="password"
            value={formik.values.password}
            type="password"
            onChange={(e) => formik.setFieldValue("password", e.target.value)}
            onBlur={formik.handleBlur}
            placeholder="Пароль"
            style={{
              ...inputStyle,
              borderBottom:
                formik.touched.password && formik.errors.password
                  ? "2px solid #F00"
                  : "2px solid #CCC",
            }}
          />
          <span className="form__input-error" id="source_link-input-error">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>
        <button
          type="submit"
          className={'form__save-button'}
          style={{color:'black',backgroundColor: formik.isValid? 'white':'rgb(255,255,255, 0.4)', marginTop:'180px' }}
          aria-label="Сохранить"
          disabled = {!formik.isValid}
        >
          {buttonTitle}
        </button>
        {children}
      </form>
    </section>
  );
};
