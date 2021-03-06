import React from 'react';

import { View, Text, Animated } from 'react-native';

import styles from './styles';
import { Button } from '../../widgets';

export default class extends React.Component {
    static defaultProps = {
        character: null,
        onPress: () => {}
    }

    constructor(props) {
        super(props)

        this.state = {
            imageExpanded: true,
            animatedHeight: new Animated.Value(200)
        }
    }

    _onShowImage() {
        if(this.state.imageExpanded) {
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start()
            this.setState({ imageExpanded: false })
        } else {
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 200,
                    duration: 500,
                }
            ).start()
            this.setState({ imageExpanded: true })
        }
    }

    render() {
        const { character } = this.props
        
        const image = character && character.image_dir ? { uri: character.image_dir } : null
        const age = character && character.edad ? character.edad : ''

        return (
            <View style={styles.container}>
                <Animated.Image source={image} resizeMode={'cover'} style={[styles.image, { height: this.state.animatedHeight }]}/>   
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>{'Edad: '}</Text>
                    <Text style={styles.text}>{age}</Text>
                </View>

                <View style={{margin: 20}}>
                    <Button label={'Ocultar Imagen'} onPress={() => this._onShowImage()} />
                </View>

                <View style={{margin: 20}}>
                    <Button label={'Editar'} />
                </View>
            </View>
        )
    }
}