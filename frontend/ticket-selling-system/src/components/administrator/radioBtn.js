import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function RadioButtonsGroup({value, onChange}) {
  const classes = useStyles();
  
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Table</FormLabel>
      <RadioGroup className={classes.root} row aria-label="tables" name="tables" value={value} onChange={onChange}>
        <FormControlLabel value="cashiers" control={<Radio />} label="Cashiers" labelPlacement="top"/>
        <FormControlLabel value="shows" control={<Radio />} label="Shows" labelPlacement="top" />
      </RadioGroup>
    </FormControl>
  );
}

RadioButtonsGroup.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}