import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./OrderNowForm.scss";

const OrderSchema = yup.object().shape({
  Address: yup.string().required(),
  MobileNumber: yup.string().required().min(12),
  Email: yup.string().email().required(),
});

const OrderNowForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(OrderSchema),
  });
  const dispatch = useDispatch();
  const onSubmitHandler = (data) => {
    console.log({ data });
    dispatch(clearCart());
    reset();
  };
  return (
    <div className="container" style={{ paddingTop: "6rem" }}>
      <div className="row">
        <div className="col-12">
          <h1>Purchase order</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis libero laboriosam cum similique velit quaerat dolorum
            deserunt eaque obcaecati beatae? Aliquam eius tempora aperiam ad
            magnam, blanditiis corporis voluptas a.
          </p>
          <form id="messageForm" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="Email">Email</label>
                <input
                  className="form-control"
                  placeholder="Email*"
                  {...register("Email")}
                  type="email"
                  name="Email"
                />
                {errors.Email && <p>{errors.Email?.message}</p>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="MobileNumber">Mobile number</label>
                <Controller
                  control={control}
                  name="MobileNumber"
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <PhoneInput
                      {...field}
                      inputExtraProps={{
                        ref,
                        required: true,
                        autoFocus: true,
                      }}
                      country={"eg"}
                      countryCodeEditable={false}
                      specialLabel={"Mobile Number"}
                    />
                  )}
                />
                {errors.MobileNumber && <p>{errors.MobileNumber?.message}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address*"
                name="Address"
                {...register("Address")}
                autoComplete="false"
              />
              {errors.Address && <p>{errors.Address?.message}</p>}
            </div>
            <div className="form-row">
              <button type="submit" className="btn btn-outline-success mx-auto">
                Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderNowForm;

// <form onSubmit={handleSubmit(onSubmit)}>
//     <input type="text" placeholder="Address" name="Address" ref={register({ required: true, min: 15, maxLength: 80, pattern: /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./i })} />
//     <input type="email" placeholder="Email" name="Email" ref={register({ required: true, pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i })} />
//     <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({ required: true, min: 11, maxLength: 11, pattern: /[01][0-9]{9}/i })} />
//     <input type="submit" />
// </form>
