import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import * as PropTypes from "prop-types";
const EntityList = (props) => {
  const { list, model } = props.state;
  if (!list || !model) return null;
  const fields = model.fields();
  return (
    <table>
      <thead>
        <tr>
          {fields.map((f) => (
            <th>model[f].label</th>
          ))}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {list.length ? (
          list.map((row) => (
            <tr>
              {fields.map((f) => (
                <td>{row[f]}</td>
              ))}
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
  );
};
EntityList.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityList);
