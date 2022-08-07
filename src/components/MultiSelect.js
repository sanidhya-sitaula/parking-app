import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();

  const { category, setCategory, categories, defaultCategories } = props;

  const getAllCategories = () => {
    let final_array = [];
    categories.map((category) => {
      final_array.push(category.name);
    });
    return final_array;
  };

  const allCategories = getAllCategories();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={
            category ? category : defaultCategories ? defaultCategories : []
          }
          defaultValue={defaultCategories ? defaultCategories : []}
          onChange={handleChange}
          input={<OutlinedInput label="Please Select Categories" />}
          MenuProps={MenuProps}
          style={{ width: "600px" }}
        >
          {allCategories.map((category1) => (
            <MenuItem key={category1} value={category1}>
              {category1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
