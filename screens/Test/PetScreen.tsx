import { CardPet } from '@components/CardPet';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
const data = [1, 2, 3, 4, 5, 6, 7];

const PetScreen = ({ route }) => {
  const [petType, setPetType] = useState('all');
  
  useEffect(() => {
    if (route.params?.type) {
      setPetType(route.params.type);
    }
  }, [route.params?.type]);

  return (
    <View>
      <Text>Pet type: {petType}</Text>
      <FlatList
          data={data}
          renderItem={({ item }) => <CardPet />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            data.push(1)
            data.push(1)
          }}
          //ItemSeparatorComponent={() => <View style={{height: 20}} />}
          columnWrapperStyle={{justifyContent: 'space-between', paddingTop: 10,}}
          style={{paddingHorizontal: 15, }}
        />
    </View>
  );
};

export default PetScreen;
