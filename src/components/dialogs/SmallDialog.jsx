import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SmallDialog = forwardRef(
  ({ onSubmit, onClose, title, explanation, submitBtnText }, ref) => (
    <dialog ref={ref} className="confirmation">
      <header>
        <h1>{title}</h1>
      </header>

      <form onSubmit={onSubmit}>
        {explanation}
        <footer>
          <menu>
            <button
              className="label-btn confirm-btn"
              formMethod="dialog"
              type="submit"
            >
              {submitBtnText}
            </button>
            <button
              className="label-btn cancel-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </menu>
        </footer>
      </form>
    </dialog>
  ),
);

/* Prop Types */
SmallDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  explanation: PropTypes.element.isRequired,
  submitBtnText: PropTypes.string.isRequired,
};

export default SmallDialog;
