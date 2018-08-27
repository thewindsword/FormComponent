import React from "react";
import {
  WingBlank,
  WhiteSpace,
  InputItem,
  Radio,
  Checkbox,
  DatePicker,
  Picker,
  TextareaItem,
  List,
  Button
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.min.css";

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

const MyCheckboxList = props => (
  <List renderHeader={() => props.title}>
    {props.data.map(item => (
      <CheckboxItem
        key={item.label + item.value}
        onChange={() => props.onChange(item.value)}
      >
        {item.label}
      </CheckboxItem>
    ))}
  </List>
);
const MyRadioList = props => (
  <List renderHeader={() => props.title}>
    {props.data.map(item => (
      <RadioItem
        key={item.label + item.value}
        checked={props.value === item.value}
        onChange={() => props.onChange(item.value)}
      >
        {item.label}
      </RadioItem>
    ))}
  </List>
);
const MyInputItem = props => (
  <InputItem
    type={props.type}
    name={props.name}
    onChange={value => props.onChange(value)}
    onBlur={props.onBlur}
    value={props.value}
  >
    {props.label}
  </InputItem>
);
const MySimplePicker = props => (
  <Picker
    value={props.value}
    data={props.data}
    cols={1}
    className={props.className}
    onOk={val => props.onOk(val)}
  >
    <List.Item arrow="horizontal">{props.label}</List.Item>
  </Picker>
);

const MyErrorItem = props =>
  props.touched && props.errors ? (
    <List.Item style={{ backgroundColor: "#eee" }}>
      <span style={{ color: "red", fontSize: ".7rem" }}>* {props.errors}</span>
    </List.Item>
  ) : null;

// HOC ERROR IN COMPONENT
function HOCErrorInItem(NormalComponent, ErrorComponent) {
  return class HOC extends React.Component {
    render() {
      return (
        <div>
          <NormalComponent {...this.props} />
          <ErrorComponent
            touched={this.props.touched}
            errors={this.props.errors}
          />
        </div>
      );
    }
  };
}
const CheckboxWithError = HOCErrorInItem(MyCheckboxList, MyErrorItem);
const RadioWithError = HOCErrorInItem(MyRadioList, MyErrorItem);
const SimplePickerWithError = HOCErrorInItem(MySimplePicker, MyErrorItem);
const InputWithError = HOCErrorInItem(MyInputItem, MyErrorItem);

export {
  CheckboxWithError,
  RadioWithError,
  SimplePickerWithError,
  InputWithError
};
