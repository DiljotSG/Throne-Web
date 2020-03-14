import { startCase } from 'lodash';

export const genderAsString = (value) => {
  switch (value) {
    case 'men':
      return startCase(value);
    case 'women':
      return startCase(value);
    case 'all':
      return 'Inclusive';
    default:
      return '';
  }
};

export const genderAsEmoji = (value) => {
  switch (value) {
    case 'men':
      return '🚹';
    case 'women':
      return '🚺';
    case 'all':
      return '🚻';
    default:
      return '';
  }
};

export const amenityAsString = (value) => {
  switch (value) {
    case 'air_dryer':
      return 'Air Dryer';
    case 'air_freshener':
      return 'Air Freshener';
    case 'auto_dryer':
      return 'Automatic Dryer';
    case 'auto_paper_towel':
      return 'Automatic Paper Towel';
    case 'auto_sink':
      return 'Automatic Sink';
    case 'auto_toilet':
      return 'Automatic Toilet';
    case 'baby_change_station':
      return 'Baby Change Station';
    case 'baby_powder':
      return 'Baby Powder';
    case 'bathroom_attendant':
      return 'Bathroom Attendant';
    case 'bidet':
      return 'Bidet';
    case 'body_towel':
      return 'Body Towel';
    case 'bodywash':
      return 'Body Wash';
    case 'braille_labeling':
      return 'Braille Labeling';
    case 'call_button':
      return 'Call Button';
    case 'coat_hook':
      return 'Coat Hook';
    case 'contraception':
      return 'Contraception';
    case 'diapers':
      return 'Diapers';
    case 'hygiene_products':
      return 'Hygiene Products';
    case 'first_aid':
      return 'First Aid';
    case 'full_body_mirror':
      return 'Full Body Mirror';
    case 'garbage_can':
      return 'Garbage Can';
    case 'heated_seat':
      return 'Heated Seat';
    case 'lotion':
      return 'Lotion';
    case 'moist_towelette':
      return 'Moist Towelette';
    case 'music':
      return 'Music';
    case 'needle_disposal':
      return 'Needle Disposal';
    case 'paper_seat_covers':
      return 'Paper Seat Covers';
    case 'paper_towel':
      return 'Paper Towel';
    case 'perfume_cologne':
      return 'Perfume Cologne';
    case 'safety_rail':
      return 'Safety Rail';
    case 'sauna':
      return 'Sauna';
    case 'shampoo':
      return 'Shampoo';
    case 'shower':
      return 'Shower';
    case 'tissues':
      return 'Tissues';
    case 'wheel_chair_access':
      return 'Wheel Chair Access';
    default:
      return '';
  }
};

export const amenityAsEmoji = (value) => {
  switch (value) {
    case 'auto_dryer':
      return '⚡️💨';
    case 'auto_sink':
      return '⚡️🚰';
    case 'auto_toilet':
      return '⚡️🚽';
    case 'air_dryer':
      return '💨';
    case 'air_freshener':
      return '🌻';
    case 'baby_change_station':
      return '👶';
    case 'bathroom_attendant':
      return '🛎';
    case 'bidet':
      return '💦';
    case 'body_towel':
      return '🧺';
    case 'call_button':
      return '📢';
    case 'contraception':
      return '🚫👶';
    case 'diapers':
      return '🧷';
    case 'hygiene_products':
      return '♀';
    case 'first_aid':
      return '🩹';
    case 'garbage_can':
      return '🗑';
    case 'heated_seat':
      return '🔥🚽';
    case 'lotion':
      return '🧴';
    case 'music':
      return '🎶';
    case 'needle_disposal':
      return '💉';
    case 'perfume_cologne':
      return '🌹';
    case 'sauna':
      return '🧖🏽‍♂️';
    case 'shampoo':
      return '🧴💆‍♀️';
    case 'shower':
      return '🚿';
    case 'tissues':
      return '🤧';
    case 'wheel_chair_access':
      return '♿️';
    default:
      return '';
  }
};

export const ratingAsEmoji = (value) => {
  switch (value) {
    case 'cleanliness':
      return '✨';
    case 'privacy':
      return '🤚';
    case 'toilet_paper_quality':
      return '🧻';
    case 'smell':
      return '👃';
    default:
      return '';
  }
};

export const displayDistance = (distance) => (
  distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${(distance).toFixed(0)} m`
);

export default {
  genderAsString,
  genderAsEmoji,
  amenityAsString,
  amenityAsEmoji,
  ratingAsEmoji,
  displayDistance,
};
