import React from "react";
import { withFormik } from "formik";
import { WingBlank, WhiteSpace, List } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.min.css";

import {
  InputWithError,
  SimplePickerWithError,
  RadioWithError,
  SubmitButton,
  DatePickerWithError,
  TextAreaWithError
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
      <DatePickerWithError
        mode="date"
        title="Select Birthday"
        extra="select birthday"
        label="Birthday"
        minDate={new Date(1900, 1, 1, 0, 0, 0)}
        maxDate={new Date()}
        onChange={val => setFieldValue("birthday", val)}
        onOk={val => setFieldTouched("birthday", true)}
        onDismiss={val => setFieldTouched("birthday", true)}
        value={values.birthday}
        touched={touched.birthday}
        errors={errors.birthday}
      />
      <List>
        <TextAreaWithError
          title="Address"
          placeholder="Input Address"
          value={values.address}
          onChange={val => setFieldValue("address", val)}
          onBlur={val => setFieldTouched("address", true)}
          onFocus={() => setFieldTouched("address", true)}
          touched={touched.address}
          errors={errors.address}
          count={50}
        />
      </List>
      <WhiteSpace />
      <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
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
    if (!values.birthday) {
      errors.birthday = "Required";
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
