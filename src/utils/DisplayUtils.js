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
  switch(value) {
    case 'airDryer':
      return 'Air Dryer';
    case 'airFreshener':
      return 'Air Freshener';
    case 'automaticDryer':
      return 'Automatic Dryer';
    case 'automaticPaperTowel':
      return 'Automatic Paper Towel';
    case 'automaticSink':
      return 'Automatic Sink';
    case 'automaticToilet':
      return 'Automatic Toilet';
    case 'babyChangeStation':
      return 'Baby Change Station';
    case 'babyPowder':
      return 'Baby Powder';
    case 'bathroomAttendant':
      return 'Bathroom Attendant';
    case 'bidet': 
      return 'Bidet';
    case 'bodyTowel':
      return 'Body Towel';
    case 'bodyWash':
      return 'Body Wash';
    case 'brailleLabeling':
      return 'Braille Labeling';
    case 'callButton':
      return 'Call Button';
    case 'coatHook':
      return 'Coat Hook';
    case 'contraception':
      return 'Contraception';
    case 'diapers':
      return 'Diapers';
    case 'hygieneProducts':
      return 'Hygiene Products';
    case 'firstAid':
      return 'First Aid';
    case 'fullBodyMirror':
      return 'Full Body Mirror';
    case 'garbageCan':
      return 'Garbage Can';
    case 'heatedSeat':
      return 'Heated Seat';
    case 'lotion':
      return 'Lotion';
    case 'moistTowelette':
      return 'Moist Towelette';
    case 'music':
      return 'Music';
    case 'needleDisposal':
      return 'Needle Disposal';
    case 'paperSeatCovers':
      return 'Paper Seat Covers';
    case 'paperTowel':
      return 'Paper Towel';
    case 'perfumeCologne':
      return 'Perfume Cologne';
    case 'safetyRail':
      return 'Safety Rail';
    case 'sauna':
      return 'Sauna';
    case 'shampoo':
      return 'Shampoo';
    case 'shower':
      return 'Shower';
    case 'tissues':
      return 'Tissues';
    case 'wheelChairAccess':
      return 'Wheel Chair Access';
    default:
      return '';
  }
}

export const amenityAsEmoji = (value) => {
  switch(value) {
    case 'automaticDryer': 
      return '⚡️💨';
    case 'automaticSink': 
      return '⚡️🚰';
    case 'automaticToilet': 
      return '⚡️🚽';
    case 'airDryer': 
      return '💨';
    case 'airFreshener': 
      return '🌻';
    case 'babyChangeStation': 
      return '👶';
    case 'bathroomAttendant': 
      return '🛎';
    case 'bidet': 
      return '💦';
    case 'bodyTowel': 
      return '🧺';
    case 'callButton': 
      return '📢';
    case 'contraception': 
      return '🚫👶';
    case 'diapers': 
      return '🧷';
    case 'hygieneProducts': 
      return '♀';
    case 'firstAid': 
      return '🩹';
    case 'garbageCan': 
      return '🗑';
    case 'heatedSeat': 
      return '🔥🚽';
    case 'lotion': 
      return '🧴';
    case 'music': 
      return '🎶';
    case 'needleDisposal': 
      return '💉';
    case 'perfumeCologne': 
      return '🌹';
    case 'sauna': 
      return '🧖🏽‍♂️';
    case 'shampoo': 
      return '🧴💆‍♀️';
    case 'shower': 
      return '🚿';
    case 'tissues':
      return '🤧';
    case 'wheelChairAccess': 
      return '♿️';
    default:
      return '';
  }
}

export default {
  genderAsString,
  genderAsEmoji,
  amenityAsString,
  amenityAsEmoji
};
