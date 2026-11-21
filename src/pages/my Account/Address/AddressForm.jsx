import FormField from "../../../Components/Forms/FormField";
import { checkoutRegions } from "../../../data/checkoutData";

const fields = [
  {
    name: "label",
    label: "Address label",
    placeholder: "Home or Work",
    wide: true,
  },
  { name: "firstName", label: "First name" },
  { name: "lastName", label: "Last name" },
  { name: "company", label: "Company (optional)", optional: true, wide: true },
  { name: "street", label: "Street address", wide: true },
  { name: "city", label: "City" },
  { name: "zipCode", label: "Postal code (optional)", optional: true },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
];

function AddressForm({
  onShow,
  handleOnShow,
  data,
  setData,
  addressInfromation,
  createEmptyAddress,
  handelSaveEdit,
  isEditing,
  setIsEditing,
}) {
  function handleData({ name, value }) {
    setData((d) => {
      return { ...d, [name]: value };
    });
  }

  function handleSaveAddress() {
    console.log(data);
    handleOnShow(false);
    addressInfromation(data);
    createEmptyAddress()
  }

  return (
    <>
      {onShow && <div className="modal-backdrop show" />}
      <div
        className={`account-address__modal modal   ${onShow ? "d-block  " : ""} `}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="account-address__modal-content modal-content">
            <div className="modal-header gap-3">
              <div>
                <h2 className="account-address__modal-title">
                  New Shipping Address
                </h2>
                <p className="account-address__hint mt-2">
                  Save an address for your order delivery.
                </p>
              </div>
              <button
                className="account-address__text-button ms-auto"
                type="button"
                onClick={() => {
                  handleOnShow(false);
                  setIsEditing(false);
                  createEmptyAddress();
                }}
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <form
                id="account-address-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isEditing) {
                    handelSaveEdit(data);
                    setIsEditing(false);
                    createEmptyAddress();
                  }else{
                  handleSaveAddress();

                  }
                }}
              >
                <fieldset>
                  <div className="row g-3">
                    {fields.map((field) => (
                      <FormField
                        key={field.name}
                        className={field.wide ? "col-12" : "col-12 col-sm-6"}
                        id={`address-${field.name}`}
                        label={field.label}
                        type={field.type ?? "text"}
                        required={!field.optional}
                        value={data[field.name]}
                        placeholder={field.placeholder ?? field.label}
                        onChange={(e) => {
                          handleData({
                            name: field.name,
                            value: e.target.value,
                          });
                        }}
                      />
                    ))}
                    <FormField
                      className="col-12 col-sm-6"
                      as="select"
                      id="address-country"
                      label="Country"
                      required
                      value={data["country"]}
                      onChange={(e) => {
                        handleData({
                          name: "country",
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select country</option>
                      {checkoutRegions.map((region) => (
                        <option key={region.country} value={region.country}>
                          {region.country}
                        </option>
                      ))}
                    </FormField>
                    <FormField
                      className="col-12 col-sm-6"
                      as="select"
                      id="address-state"
                      label="State / Region"
                      required
                      value={data["state"]}
                      onChange={(e) => {
                        handleData({
                          name: "state",
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select region</option>
                      {checkoutRegions.map((region) => {
                        if (region.country === data["country"]) {
                          return region.states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ));
                        }
                      })}
                    </FormField>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="account-address__button"
                type="button"
                onClick={() => {
                  handleOnShow(false);
                  setIsEditing(false);
                  createEmptyAddress();
                }}
              >
                Cancel
              </button>
              {isEditing ? (
                <button
                  className="account-address__button account-address__button--primary"
                  type="submit"
                  form="account-address-form"
                  // onClick={() => {
                  //   handelSaveEdit(data);
                  //   setIsEditing(false);
                  //   createEmptyAddress();
                  // }}
                >
                  Edit Address
                </button>
              ) : (
                <button
                  className="account-address__button account-address__button--primary"
                  type="submit"
                  form="account-address-form"
                  // onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressForm;
