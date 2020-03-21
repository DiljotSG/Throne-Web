import { startCase } from 'lodash';
import * as amenities from '../constants/WashroomAmenityTypes';

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
    case amenities.AIR_DRYER:
      return 'Air Dryer';
    case amenities.AIR_FRESHENER:
      return 'Air Freshener';
    case amenities.AUTO_DRYER:
      return 'Automatic Dryer';
    case amenities.AUTO_PAPER_TOWEL:
      return 'Automatic Paper Towel';
    case amenities.AUTO_SINK:
      return 'Automatic Sink';
    case amenities.AUTO_TOILET:
      return 'Automatic Toilet';
    case amenities.BABY_CHANGE_STATION:
      return 'Baby Change Station';
    case amenities.BABY_POWDER:
      return 'Baby Powder';
    case amenities.BATHROOM_ATTENDANT:
      return 'Bathroom Attendant';
    case amenities.BIDET:
      return 'Bidet';
    case amenities.BODY_TOWEL:
      return 'Body Towel';
    case amenities.BODYWASH:
      return 'Body Wash';
    case amenities.BRAILLE_LABELING:
      return 'Braille Labeling';
    case amenities.CALL_BUTTON:
      return 'Call Button';
    case amenities.COAT_HOOK:
      return 'Coat Hook';
    case amenities.CONTRACEPTION:
      return 'Contraception';
    case amenities.DIAPERS:
      return 'Diapers';
    case amenities.HYGIENE_PRODUCTS:
      return 'Hygiene Products';
    case amenities.FIRST_AID:
      return 'First Aid';
    case amenities.FULL_BODY_MIRROR:
      return 'Full Body Mirror';
    case amenities.GARBAGE_CAN:
      return 'Garbage Can';
    case amenities.HEATED_SEAT:
      return 'Heated Seat';
    case amenities.LOTION:
      return 'Lotion';
    case amenities.MOIST_TOWELETTE:
      return 'Moist Towelette';
    case amenities.MUSIC:
      return 'Music';
    case amenities.NEEDLE_DISPOSAL:
      return 'Needle Disposal';
    case amenities.PAPER_SEAT_COVERS:
      return 'Paper Seat Covers';
    case amenities.PAPER_TOWEL:
      return 'Paper Towel';
    case amenities.PERFUME_COLOGNE:
      return 'Perfume Cologne';
    case amenities.SAFETY_RAIL:
      return 'Safety Rail';
    case amenities.SAUNA:
      return 'Sauna';
    case amenities.SHAMPOO:
      return 'Shampoo';
    case amenities.SHOWER:
      return 'Shower';
    case amenities.TISSUES:
      return 'Tissues';
    case amenities.WHEEL_CHAIR_ACCESS:
      return 'Wheel Chair Access';
    default:
      return '';
  }
};

export const amenityAsEmoji = (value) => {
  switch (value) {
    case amenities.AUTO_DRYER:
      return '⚡️💨';
    case amenities.AUTO_SINK:
      return '⚡️🚰';
    case amenities.AUTO_TOILET:
      return '⚡️🚽';
    case amenities.AIR_DRYER:
      return '💨';
    case amenities.AIR_FRESHENER:
      return '🌻';
    case amenities.BABY_CHANGE_STATION:
      return '👶';
    case amenities.BATHROOM_ATTENDANT:
      return '🛎';
    case amenities.BIDET:
      return '💦';
    case amenities.BODY_TOWEL:
      return '🧺';
    case amenities.CALL_BUTTON:
      return '📢';
    case amenities.CONTRACEPTION:
      return '🚫👶';
    case amenities.DIAPERS:
      return '🧷';
    case amenities.HYGIENE_PRODUCTS:
      return '♀';
    case amenities.FIRST_AID:
      return '🩹';
    case amenities.GARBAGE_CAN:
      return '🗑';
    case amenities.HEATED_SEAT:
      return '🔥🚽';
    case amenities.LOTION:
      return '🧴';
    case amenities.MUSIC:
      return '🎶';
    case amenities.NEEDLE_DISPOSAL:
      return '💉';
    case amenities.PERFUME_COLOGNE:
      return '🌹';
    case amenities.SAUNA:
      return '🧖🏽‍♂️';
    case amenities.SHAMPOO:
      return '🧴💆‍♀️';
    case amenities.SHOWER:
      return '🚿';
    case 'tissues':
      return '🤧';
    case amenities.WHEEL_CHAIR_ACCESS:
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

export const buildingPinEmoji = (rating) => {
  let icon = '👑';
  if (rating <= 0) {
    icon = '🏢';
  } else if (rating <= 1.5) {
    icon = '💀';
  } else if (rating <= 2.5) {
    icon = '💩';
  } else if (rating <= 4.0) {
    icon = '🧻';
  }
  return icon;
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
