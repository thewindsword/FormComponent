import React from "react";
import { withFormik } from "formik";
import { WingBlank, WhiteSpace, List } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.min.css";

import {
  InputWithError,
  SimplePickerWithError,
  RadioWithError
} from "./formComponents";

const InnerForm = ({
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <WingBlank>
      <List>
        <InputWithError
          type="email"
          name="Email"
          label="Email"
          onChange={value => setFieldValue("email", value)}
          onBlur={() => setFieldTouched("email", true)}
          value={values.email}
          touched={touched.email}
          errors={errors.email}
        />
        <InputWithError
          type="password"
          name="Password"
          label="Password"
          onChange={value => setFieldValue("password", value)}
          onBlur={handleBlur}
          value={values.password}
          touched={touched.password}
          errors={errors.password}
        />
        <SimplePickerWithError
          value={values.isPeople}
          label="isPeople"
          data={[
            {
              value: "yes",
              label: "Yes"
            },
            {
              value: "no",
              label: "No"
            }
          ]}
          onOk={val => setFieldValue("isPeople", val)}
          touched={touched.isPeople}
          errors={errors.isPeople}
        />
      </List>
      {values.isPeople && values.isPeople[0] === "yes" ? (
        <RadioWithError
          title="AuthMethod"
          value={values.authMethod}
          onChange={val => setFieldValue("authMethod", val)}
          data={[
            { value: "1", label: "PeopleCard" },
            { value: "2", label: "ChildCard" }
          ]}
        />
      ) : null}
      <WhiteSpace />
      <button
        className="my-submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </WingBlank>
  </form>
);

// Wrap our form with the using withFormik HoC
const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    email: "",
    password: "",
    isPeople: props.isPeople
  }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.isPeople) {
      errors.isPeople = "Required";
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    console.log(values);
    console.log({
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    });
  }
})(InnerForm);

// Use <MyForm /> anywhere
const Basic = () => (
  <div>
    <h1>My Form</h1>
    <p>This can be anywhere in your application</p>
    <MyForm isPeople={["yes"]} />
  </div>
);

export default Basic;
