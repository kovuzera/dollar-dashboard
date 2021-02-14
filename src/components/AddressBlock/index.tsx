import React from "react";

type AddressBlockProps = {
  label: string;
  address: string;
};

function AddressBlock({ label, address }: AddressBlockProps) {
  return (
    <>
      <div>{label}</div>
      <div>{/* <IdentityBadge entity={address} shorten /> */}</div>
    </>
  );
}

export default AddressBlock;
