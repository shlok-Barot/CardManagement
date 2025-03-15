import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { RootState } from "../redux/store";
import { v4 as uuidv4 } from "uuid";

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
  existingDefaultCardTypes: string[];
}

interface CardFormData {
  name: string;
  bankName: string;
  type: string;
  cardNumber: string;
  validTill: string;
  cvv: string;
  isDefault: boolean;
  addToGPay: boolean;
}

const schema: yup.ObjectSchema<CardFormData> = yup.object().shape({
  name: yup
    .string()
    .max(35, "Name cannot exceed 35 characters")
    .required("Name is required"),
  bankName: yup.string().required("Bank Name is required"),
  type: yup.string().required("Card Type is required"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card Number must be 16 digits")
    .required("Card Number is required"),
  validTill: yup
    .string()
    .required("Valid Till is required")
    .test("is-future-date", "Valid Till must be a future date", (value) => {
      if (!value) return false;
      const [year, month] = value.split("-");
      const expiryDate = new Date(Number(year), Number(month), 1);
      return expiryDate > new Date();
    }),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, "CVV must be 3 digits")
    .required("CVV is required"),
  isDefault: yup
    .boolean()
    .required("isDefault is required")
    .test(
      "is-unique-default",
      "The selected card type already has a default card.",
      function (value) {
        const { type } = this.parent;
        return !(
          value &&
          this.options.context?.existingDefaultCardTypes?.includes(type)
        );
      }
    ),
  addToGPay: yup.boolean().required("addToGPay is required"),
});

const AddCardModal: React.FC<AddCardModalProps> = ({
  open,
  onClose,
  existingDefaultCardTypes,
}) => {
  const dispatch = useDispatch();
  const cardData = useSelector((state: RootState) => state.card.cards);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormData>({
    resolver: yupResolver(schema),
    context: { existingDefaultCardTypes },
    defaultValues: {
      name: "",
      bankName: "",
      type: "",
      cardNumber: "",
      validTill: "",
      cvv: "",
      isDefault: false,
      addToGPay: false,
    },
  });

  const onSubmit = (data: CardFormData) => {
    const existingDefaultCard = cardData.some(
      (card) => card.type === data.type && card.isDefault
    );
    const existingAddGPay = cardData.some(
      (card) => card.type === data.type && card.addToGPay
    );

    if (data.isDefault && existingDefaultCard) {
      alert("The selected card type already has a default card.");
      return;
    }
    if (data.addToGPay && existingAddGPay) {
      alert("The GPay Card already selected.");
      return;
    }
    dispatch(
      addCard({
        ...data,
        id: uuidv4(),
        isLock: false,
        isArchive: false,
      })
    );
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        New Card
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bank Name"
                  fullWidth
                  error={!!errors.bankName}
                  helperText={errors.bankName?.message}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Card Type"
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="debit">Debit Card</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Card Number"
                  fullWidth
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              )}
            />
            <div className="flex gap-4">
              <Controller
                name="validTill"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valid Till"
                    type="month"
                    fullWidth
                    error={!!errors.validTill}
                    helperText={errors.validTill?.message}
                  />
                )}
              />
              <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CVV"
                    type="password"
                    error={!!errors.cvv}
                    helperText={errors.cvv?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="isDefault"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e: { target: { checked: any } }) =>
                          field.onChange(e.target.checked)
                        }
                      />
                    }
                    label="Set this card as Default"
                  />
                )}
              />
            </div>
            <div style={{ marginTop: "0px" }}>
              <Controller
                name="addToGPay"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e: { target: { checked: any } }) =>
                          field.onChange(e.target.checked)
                        }
                      />
                    }
                    label="Add this card to GPay?"
                  />
                )}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            className="bg-sky-500 hover:bg-sky-600"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCardModal;
