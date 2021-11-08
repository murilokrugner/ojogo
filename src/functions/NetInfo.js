import NetInfo from "@react-native-community/netinfo";

export default NetInfo.fetch().then(state => {
  return state.isConnected;
});
