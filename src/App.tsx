import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [isCross, setIsCross] = React.useState<boolean>(false);
  const [gameWinner, setGameWinner] = React.useState<string>('');
  const [gameState, setGameState] = React.useState<string[]>(
    new Array(9).fill('empty', 0, 9),
  );

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkWinner = () => {
    if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2]
    ) {
      setGameWinner(`${gameState[0]} wins`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} wins`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} wins`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} wins`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} wins`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} wins`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} wins`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} wins`);
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: 'Game already over',
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Item already filled',
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }

    checkWinner();
  };

  return (
    <SafeAreaView>
      {gameWinner ? (
        <View style={[styles.winnerInfo, styles.playerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'} turn
          </Text>
        </View>
      )}
      {/* {Game Grid} */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />
      {/* Game Action */}
      <Pressable style={styles.gameBtn} onPress={() => reloadGame()}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new Game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
