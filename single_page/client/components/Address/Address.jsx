import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField } from '@boldcommerce/stacks-ui/';
import './Address.css';

const Address = ({
  address,
  onChange,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
  requiredAddressFields,
}) => {
  const countryList = countries.map((countryItem) => <option value={countryItem.iso_code} key={countryItem.iso_code}>{countryItem.name}</option>);
  const provinceList = provinces.map((provinceItem) => <option value={provinceItem.iso_code} key={provinceItem.iso_code}>{provinceItem.name}</option>);
  const hasRequiredFields = requiredAddressFields && requiredAddressFields.length;
  const handleSubmit = useCallback(() => {
    if (address && address.country_code) {
      submit();
    }
  }, [
    address.country_code,
    address.province_code,
    address.postal_code,
    showProvince,
    showPostalCode,
    address.first_name,
    address.last_name,
    address.business_name,
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.phone_number,
    address.id,
  ]);

  // Submit address if user has stopped typing
  useEffect(() => {
    const postalCodeTimeout = setTimeout(() => {
      handleSubmit();
    }, 2000);
    return () => clearTimeout(postalCodeTimeout);
  }, [
    address.first_name,
    address.last_name,
    address.business_name,
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.country_code,
    address.province_code,
    address.postal_code,
    address.phone_number,
    address.id,
  ]);

  return (
    <div className="FieldSet--Address">
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('first_name') ? 'First name' : 'First name (optional)'}
          type="text"
          name="first_name"
          className="Field Field--FirstName"
          value={address?.first_name ?? ''}
          messageType={errors && errors?.first_name && 'alert' || ''}
          messageText={errors && errors?.first_name && 'Enter a first name' || ''}
          onChange={(e) => onChange({
            first_name: e.target.value,
          })}
        />
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('last_name') ? 'Last name' : 'Last name (optional)'}
          type="text"
          name="last_name"
          className="Field Field--LastName"
          value={address?.last_name ?? ''}
          messageType={errors && errors?.last_name && 'alert' || ''}
          messageText={errors && errors?.last_name && 'Enter a last name' || ''}
          onChange={(e) => onChange({
            last_name: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('business_name') ? 'Company' : 'Company (optional)'}
          type="text"
          name="business_name"
          className="Field Field--Company"
          value={address?.business_name ?? ''}
          messageType={errors && errors?.business_name && 'alert' || ''}
          messageText={errors && errors?.business_name && 'Enter a company name' || ''}
          onChange={(e) => onChange({
            business_name: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('address_line_1') ? 'Address' : 'Address (optional)'}
          type="text"
          name="address_line_1"
          className="Field Field--Address"
          value={address?.address_line_1 ?? ''}
          messageType={errors && errors?.address && 'alert' || ''}
          messageText={errors && errors?.address && 'Enter an address' || ''}
          onChange={(e) => onChange({
            address_line_1: e.target.value,
          })}
        />
        <InputField
          placeholder="Apt, suite, etc."
          type="text"
          name="address_line_2"
          className="Field Field--Address2"
          value={address?.address_line_2 ?? ''}
          onChange={(e) => onChange({
            address_line_2: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('city') ? 'City' : 'City (optional)'}
          type="text"
          name="city"
          value={address?.city ?? ''}
          messageType={errors && errors?.city && 'alert' || ''}
          messageText={errors && errors?.city && 'Enter a city' || ''}
          className="Field Field--City"
          onChange={(e) => onChange({
            city: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <SelectField
          placeholder="Select a country"
          className="SelectField Field--Country"
          value={address?.country_code ?? ''}
          messageType={errors && errors?.country && 'alert' || ''}
          messageText={errors && errors?.country && 'Select a country' || ''}
          onChange={(e) => onChange({
            country_code: e.target.value,
          })}
        >
          {countryList}
        </SelectField>
        {
          address?.country_code
            && showProvince && (
            <SelectField
              placeholder={
                `Select a ${provinceLabel}`
              }
              className="SelectField Field--Province"
              value={address?.province_code ?? ''}
              messageType={errors && errors?.province && 'alert' || ''}
              messageText={errors && errors?.province && 'Select a province or state' || ''}
              onChange={(e) => onChange({
                province_code: e.target.value,
              })}
            >
              {provinceList}
            </SelectField>
          )
        }
        {address?.country_code
          && showPostalCode && (
            <InputField
              placeholder="Postal code / ZIP"
              type="text"
              name="postal"
              className="Field Field--Postal_Code"
              messageType={errors && errors?.postal_code && 'alert' || ''}
              messageText={errors && errors?.postal_code}
              value={address?.postal_code ?? ''}
              onChange={(e) => onChange({
                postal_code: e.target.value,
              })}
            />
          )}
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('phone_number') ? 'Phone' : 'Phone (optional)'}
          type="tel"
          name="phone_number"
          className="Field Field--Phone"
          value={address?.phone_number ?? ''}
          messageType={errors && errors?.phone_number && 'alert' || ''}
          messageText={errors && errors?.phone_number && 'Enter a phone number' || ''}
          onChange={(e) => onChange({
            phone_number: e.target.value,
          })}
        />
      </div>
    </div>
  );
};

Address.propTypes = {
  address: PropTypes.any,
  onChange: PropTypes.func,
  errors: PropTypes.any,
  countries: PropTypes.any,
  provinces: PropTypes.any,
  showPostalCode: PropTypes.bool,
  showProvince: PropTypes.bool,
  provinceLabel: PropTypes.string,
  submit: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};

export default Address;
