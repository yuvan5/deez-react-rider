// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Alert, Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../firebaseCon';

class OrderListScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('orders');
    this.state = {
      isLoading: true,
      ordersArr: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const ordersArr = [];
    querySnapshot.forEach((res) => {
      const { address, cart, total, rider, status } = res.data();
      const id = localStorage.getItem('id');
      if (rider === id) {
        const a = cart.map(c => c.name);
        let cartName = a[0];
        for (var i = 1; i < a.length; i++)
          cartName += ', ' + a[i];

        ordersArr.push({
          key: res.id,
          address,
          total,
          cartName,
          disableButton: status === 'delivered' || status === 'completed' ? true : false
        });
      }
    });
    this.setState({
      ordersArr,
      isLoading: false,
    });
  }

  update(id) {
    firebase.firestore().doc(`orders/${id}`).update({ status: 'delivered' });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        {
          this.state.ordersArr.map((item, i) => {
            return (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.cartName}</ListItem.Title>
                  <ListItem.Subtitle>{item.address.details}, {item.address.postcode}, {item.address.district}, {item.address.state}</ListItem.Subtitle>
                </ListItem.Content>

                <Button
                  title="Update"
                  color="#f194ff"
                  disabled={item.disableButton}
                  onPress={() => this.update(item.key)}
                />

              </ListItem>
            );
          })
        }
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default OrderListScreen;