import PropTypes from 'prop-types';
import 'components/NotificatiomMessage/NotisicationMessage.scss';

const NotificatiomMessage = ({ message, color }) => {
  return (
    <h2 style={{ color: color }} className="message">
      {message}
    </h2>
  );
};

NotificatiomMessage.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default NotificatiomMessage;
