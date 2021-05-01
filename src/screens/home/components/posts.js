import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import Stories from './stories';

const HeartIcon = <Icon name="hearto" size={24} color="#000" />;
const ChatIcon = <Icon name="message1" size={24} color="#000" />;
const DotsIcon = <Icon name="ellipsis1" size={24} color="#000" />;

const {height, width} = Dimensions.get('window');
const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '6089eb93c05d7b509eda1768';

const Item = ({item}) => (
  <View style={styles.root}>
    <View style={styles.itemHeader}>
      <View style={styles.user}>
        <TouchableOpacity>
          <Image style={styles.image} source={{uri: item.owner.picture}} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 12}}>
          <Text>{item.owner.firstName}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>{DotsIcon}</TouchableOpacity>
    </View>
    <Image style={styles.post} resizeMode="cover" source={{uri: item.image}} />
    <View style={styles.footer}>
      <TouchableOpacity style={{marginRight: 12}}>{HeartIcon}</TouchableOpacity>
      <TouchableOpacity>{ChatIcon}</TouchableOpacity>
    </View>
    <View style={{paddingHorizontal: 12, paddingVertical: 6}}>
      <Text>{item.likes} likes</Text>
    </View>
    <View style={{paddingHorizontal: 12, paddingVertical: 6}}>
      <Text>{item.text}</Text>
    </View>
  </View>
);

const posts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/post`, {headers: {'app-id': APP_ID}})
      .then(({data}) => setData(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      ListHeaderComponent={Stories}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={data}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default posts;

const styles = StyleSheet.create({
  root: {
    paddingBottom: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    borderTopWidth: 0.2,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.03,
  },
  post: {
    width: width,
    height: width,
  },
  footer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
});
