import React from 'react';

import {Image, TouchableOpacity} from 'react-native';

type Props = {
  src: any;
  eventHandler: () => void;
};

const IconButton = ({src, eventHandler}: Props) => {
  return (
    <TouchableOpacity onPress={eventHandler}>
      {/* <Image source={home} color={}/> */}
    </TouchableOpacity>
  );
};

export default IconButton;
