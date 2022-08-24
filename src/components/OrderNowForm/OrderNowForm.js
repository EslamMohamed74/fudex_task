import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./OrderNowForm.scss";
import SuccessfullyModal from "../SuccessfullyModal/SuccessfullyModal";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const onSubmitHandler = (data) => {
    console.log({ data });
    handleShow();
    dispatch(clearCart());
    reset();
    setTimeout(() => {
      handleClose();
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <SuccessfullyModal show={show} />
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
                <button
                  type="submit"
                  className="btn btn-outline-success mx-auto"
                >
                  Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderNowForm;
