import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import * as PropTypes from "prop-types";
const EntityList = (props) => {
  const { state } = props;
  const { list, model } = state;
  if (!list || !model) return null;
  const fields = model.fields();
  const ignored = ["_id", "__v", "createdAt", "updatedAt"];
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            state.new();
          }}
        >
          Create New
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            {fields.map((f) =>
              ignored.includes(f) ? null : <th>{model[f].label}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            list.map((row) => (
              <tr>
                {fields.map((f) =>
                  ignored.includes(f) ? null : <td>{row[f]}</td>
                )}
                <td>
                  <Button>Edit</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1}>List is empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
EntityList.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityList);
