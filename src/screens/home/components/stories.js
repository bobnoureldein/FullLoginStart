import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '6089eb93c05d7b509eda1768';
const {height, width} = Dimensions.get('window');

const Stories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, {headers: {'app-id': APP_ID}})
      .then(({data}) => setData(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <View style={styles.itemContainer} key={item.id}>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={{uri: item.picture}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text style={styles.name}>{item.firstName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  loading: {
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
  },
  container: {
    width: width,
    height: width * 0.3,
    borderBottomWidth: 0.2,
  },
  itemContainer: {
    alignItems: 'center',
    marginLeft: width * 0.03,
    marginVertical: width * 0.03,
    justifyContent: 'space-between',
  },

  image: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    borderWidth: 3,
    borderColor: 'green',
  },
  name: {
    fontSize: 10,
  },
});
