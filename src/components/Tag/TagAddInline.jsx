import { useEffect, useState } from "react";

import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, createFilterOptions, styled, withStyles } from "@mui/material"

const StyledAutocomplete = styled({
  tag: {
    color: "#ad4e64",
    border: "1px solid #ad4e64",
    background: "transparent",
    svg: {
      color: "#ad4e64 !important"
    }
  }
})(Autocomplete);

const ERROR_TYPE = {
  DUPLICATE: "duplicate"
};

const OPTIONS_TYPE = {
  NEW: "new"
};

const filter = createFilterOptions()

function TagAddInline({ name, value, handleAutocompleteChange }) {
  const tagOptions = [
    { id: 1, name: "Dogs" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Pet" },
    { id: 4, name: "Animal" }
  ];

  const [tags, setTags] = useState([tagOptions[0], tagOptions[1]]);
  const [defaultTags, setDefaultTags] = useState([
    tagOptions[0],
    tagOptions[1]
  ]);
  const [tagName, setTagName] = useState("helo");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedAddTag, setSelectedAddTag] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (selectedTag === null) {
      setTagName("");
    }
  }, [selectedTag, selectedAddTag]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            namd={name}
            options={tagOptions}
            defaultValue={defaultTags}
            value={tags}
            multiple
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }

              return option.name;
            }}
            style={{ width: 300 }}
            inputValue={tagName}
            renderInput={(params) => (
              <TextField {...params} label="Tags" variant="outlined" />
            )}
            onInputChange={(event, value) => {
              setTagName(value);
            }}
            onClose={(event, reason) => {
              if (reason === "blur") {
                setSelectedTag(null);
              }
            }}
            onChange={(event, value, reason) => {
              switch (reason) {
                case "clear":
                  setTags([]);
                  break;
                case "remove-option":
                  setTags(value);
                  break;
                case "select-option":
                  const lastItem = value[value.length - 1];
                  if (typeof lastItem === "string") {
                    setSelectedTag(null);
                    break;
                  }
                  if (!!lastItem.type) {
                    setSelectedAddTag(lastItem);
                    setOpenDialog(true);
                    break;
                  }
                  const isExists = tags.some(
                    (tagItem) => tagItem.id === lastItem.id
                  );
                  if (isExists) {
                    setSelectedTag(null);
                  } else {
                    setSelectedTag(lastItem);
                    setTags(value);
                  }
                  break;
                default:
                  break;
              }
              console.log("nkc", value);
              console.log("nkc", reason);
            }}
            freeSolo
            selectOnFocus
            handleHomeEndKeys
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                filtered.push({
                  type: OPTIONS_TYPE.NEW,
                  value: params.inputValue,
                  name: `Add "${params.inputValue}"`
                });
              }
              return filtered;
            }}
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => {
          setSelectedAddTag(null);
          setOpenDialog(false);
        }}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          Do you want to add this option "{selectedAddTag?.value ?? ""}"?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              let maxId = 1;
              for (const item in tags) {
                if (item.id > maxId) {
                  maxId = item.id;
                }
              }
              setTags([...tags, { id: maxId + 1, name: selectedAddTag.value }]);
              setOpenDialog(false);
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedAddTag(null);
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TagAddInline