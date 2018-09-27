import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput } from '../../widgets/';

import ImagePicker from 'react-native-image-picker';

import styles from './styles';

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            age: '',
            image: ''
        };

        this.options = {
            title: 'Select image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
    }

    _onImagePickerTapped() {
        console.log(this.options);
        console.log(ImagePicker);

        if (!ImagePicker) {
            return
        }

        ImagePicker.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let preview = { uri: response.uri };
                let data = `data:image/jpeg;base64,${response.data}`;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.setState({
                    image: { preview, data }
                });
            }
        });
    }

    _renderImageInput() {
        const imageUri = this.state.image ? this.state.image.preview : null
        const imageLabel = this.state.image ? 'Pulsa para escoger otra imagen' : 'Pulsa para elegir imagen'
        return (
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this._onImagePickerTapped()}>
                    <Image source={imageUri} style={styles.image} resizeMode={'cover'} />
                    <Text style={styles.imageButton}>{imageLabel}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{padding: 20}}>
                    <TextInput 
                        label={'Nombre del personaje:'}
                        value={this.state.name}
                        onChangeText={ name => this.setState({ name }) }
                        placeholder={'Eddard Stark'}
                        />
                </View>
                <View style={{padding: 20}}>
                    <TextInput 
                        label={'Edad del personaje:'}
                        value={this.state.age}
                        onChangeText={ age => this.setState({ age }) }
                        placeholder={'32'}
                        />
                </View>

                <View style={{ paddingHorizontal: 20, paddingBottom: 40}}>
                    { this._renderImageInput() }
                </View>

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <Button label={'Guardar'.toUpperCase()} />
                </View>
            </View>
        )
    }
}