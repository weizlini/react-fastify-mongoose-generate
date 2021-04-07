import { observer } from "mobx-react";
import { TextField } from "@material-ui/core";
import * as PropTypes from "prop-types";

const EntityForm = (props) => {
  const state = props.state;
  const { isEditing, model } = state;
  const ignored = ["_id", "__v", "createdAt", "updatedAt"];
  if (!model) return null;
  return (
    <div>
      {isEditing ? (
        <div style={{ width: "500px" }}>
          {model.fields().map((f) =>
            ignored.includes(f) ? null : (
              <div>
                <TextField
                  key={f}
                  value={model[f].value}
                  error={model.validated && !!model[f].error}
                  label={model[f].label}
                  onChange={(e) => {
                    console.log(e.target.value);
                    model[f].setValue(e.target.value);
                  }}
                />
              </div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
};
EntityForm.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityForm);
