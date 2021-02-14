import React from "react";
import styled from "styled-components";

type checkBoxProps = {
  text: string;
  checked: boolean;
  onCheck: Function;
};

function MyCheckBox({ text, checked, onCheck }: checkBoxProps) {
  return (
    <CheckBoxWrapper>
      <input type="checkbox" checked={checked} onChange={() => onCheck}></input>
      <span style={{ margin: "4px" }}>{text}</span>
      <br />
    </CheckBoxWrapper>
  );
}

export default MyCheckBox;

const CheckBoxWrapper = styled.div`
   {
    display: flex;
    font-size: 14px;
    color: ${(props) => props.theme.surfaceContentSecondary};
  }
`;
