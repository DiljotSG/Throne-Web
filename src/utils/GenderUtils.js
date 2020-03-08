import { startCase } from 'lodash';

export const genderAsString = (value) => {
    switch(value) {
        case 'men':
          return startCase(value)
        case 'women':
            return startCase(startCase)
        case 'all':
            return 'Inclusive'
        default:
            return ''
      }
};

export const genderAsEmoji = (value) => {
    switch(value) {
        case 'men':
          return '🚹'
        case 'women':
            return '🚺'
        case 'all':
            return '🚻'
        default:
            return ''
      }
  };
  
export default { genderAsString, genderAsEmoji };
  