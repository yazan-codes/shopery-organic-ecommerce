import AddressForm from "./AddressForm";
import "./Address.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Address({ checkout = false, selectedAddressId = null, onSelectAddress }) {
  let [onShow, setOnShow] = useState(false);
  let [data, setData] = useState({
    id: uuidv4(),
    label: "",
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
    country: "",
    state: "",
  });
  let [isEditing, setIsEditing] = useState(false);
  let [dataAddress, setDataAddress] = useState([]);

  // let [dataAddress, setDataAddress] = useState({
  //   label: "UI Test Home",
  //   firstName: "Test",
  //   lastName: "Customer",
  //   company: "",
  //   street: "12 Example Street",
  //   city: "Hebron",
  //   zipCode: "",
  //   email: "test@example.test",
  //   phone: "000-000-0000",
  //   country: "Palestine",
  //   state: "Gaza",
  // });
  // function handleDataAddress({name,value}){
  //   setDataAddress((data)=>{
  //     return { ...data, [name]: value };
  //   })
  // }

  function handleOnShow(value) {
    setOnShow(value);
  }

  function handleDataAddress(data) {
    setDataAddress([...dataAddress, data]);
    onSelectAddress?.(data.id);
  }
    function createEmptyAddress(){
      setData({
        id: uuidv4(),
        label: "",
        firstName: "",
        lastName: "",
        company: "",
        street: "",
        city: "",
        zipCode: "",
        email: "",
        phone: "",
        country: "",
        state: "",
      });
    }
  function handelDelete(addresId) {
    if (selectedAddressId === addresId) onSelectAddress?.(null);
    console.log(addresId);
    setDataAddress(
      dataAddress.filter((addres) => {
        return addres.id !== addresId;
      }),
    );
  }

  function handelSaveEdit(editAddres) {
    setDataAddress((oldAddress) => {
      return oldAddress.map((addres) => {
          if (addres.id === editAddres.id) {
            return editAddres;
          } else {
            return addres;
          }
      })
    });
    handleOnShow(false);
  }

function handelDefault(addresId) {
  
   setDataAddress((oldAddress)=>{
    return oldAddress.map((addres)=>{
      return {...addres, isDefault: addres.id === addresId }
    })
   })
}

  return (
    <section className="account-address w-100">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        {!checkout && <h1 className="account-address__title">Address</h1>}
        <button
          className="account-address__button"
          type="button"
          onClick={() => {
            handleOnShow(true);
            setIsEditing(false);
          }}
        >
          + Add a new address
        </button>
      </div>
      {checkout && dataAddress.length === 0 && (
        <p className="account-address__hint mb-3">No delivery addresses yet. Add an address to continue.</p>
      )}
      {/* Static examples only. Add your data and event handlers here. */}
      <div className="row g-3">
        {dataAddress.map((addres) => {
          return (
            <div className="col-12 col-md-6" key={addres.id}>
              <article className={`account-address__card h-100 p-4 d-flex flex-column ${checkout && selectedAddressId === addres.id ? "is-selected" : ""}`}>
                <h2 className="account-address__card-title mb-3">
                  {checkout ? (
                    <label className="account-address__select">
                      <input type="radio" name="delivery-address" value={addres.id} checked={selectedAddressId === addres.id} onChange={() => onSelectAddress?.(addres.id)} />
                      {addres.label}
                    </label>
                  ) : addres.label}
                </h2>
                <p className="account-address__name mb-2">{addres.firstName}</p>
                <p>{addres.street}</p>
                <p>
                  {addres.city}, {addres.country}
                </p>
                <p className="mb-2">{addres.phone}</p>
                <p className="text-break mb-3">{addres.email}</p>
                <div className="mt-auto">
                  {addres.isDefault ? 
                  (
                    <span className="account-address__default d-inline-block mb-3">
                      Default address
                    </span>
                  ) : (
                    <button
                      className="account-address__button mb-3"
                      type="button"
                      onClick={() => handelDefault(addres.id)}
                    >
                      Set as Default
                    </button>
                  )}

                  <div className="d-flex gap-3">
                    <button
                      className="account-address__text-button"
                      type="button"
                      onClick={() => {
                        handleOnShow(true);
                        setData(addres);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="account-address__text-button account-address__error"
                      type="button"
                      onClick={() => handelDelete(addres.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}

        {/* <div className="col-12 col-md-6">
          <article className="account-address__card h-100 p-4 d-flex flex-column">
            <h2 className="account-address__card-title mb-3">Work</h2>
            <p className="account-address__name mb-2">Ahmad</p>
            <p>24 Example Street</p>
            <p>Ramallah, Palestine</p>
            <p className="mb-2">000-000-0000</p>
            <p className="text-break mb-3">customer@example.test</p>
            <div className="mt-auto">
              <button className="account-address__button mb-3" type="button">
                Set as Default
              </button>
              <div className="d-flex gap-3">
                <button className="account-address__text-button" type="button">
                  Edit
                </button>
                <button
                  className="account-address__text-button account-address__error"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        </div> */}
      </div>
      {/* The modal structure is hidden until you add the opening behavior. */}
      <AddressForm
        onShow={onShow}
        handleOnShow={handleOnShow}
        data={data}
        setData={setData}
        addressInfromation={handleDataAddress}
        createEmptyAddress={createEmptyAddress}
        handelSaveEdit={handelSaveEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </section>
  );
}

export default Address;
