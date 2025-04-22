import * as ImagePicker from 'expo-image-picker';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from "@ui-kitten/components";
import {useState} from "react";
import {MyActivityIndicator} from "../ui/MyActivityIndicator";

export const PetPhotoUploader = ({ photo, onPhotoChange }: { photo: string | null, onPhotoChange: (uri: string, file?: File) => void }) => {

    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        try {
            setLoading(true);
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8, // Reducir calidad para optimizar tamaño
            });

            if (!result.canceled && result.assets) {
                const selectedAsset = result.assets[0];

                // Validar tamaño (ejemplo: máximo 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB en bytes
                const response = await fetch(selectedAsset.uri);
                const blob = await response.blob();
                if (blob.size > maxSize) {
                    alert('La imagen es demasiado grande. Selecciona una imagen menor a 5MB.');
                    return;
                }

                // Validar tipo
                if (!['image/jpeg', 'image/png'].includes(blob.type)) {
                    alert('Solo se permiten imágenes en formato JPG o PNG.');
                    return;
                }

                const file = new File([blob], `pet-photo-${Date.now()}.jpg`, { type: blob.type });
                onPhotoChange(selectedAsset.uri, file);
            }
        } catch (error) {
            console.warn('Error al seleccionar la imagen:', error);
            alert('No se pudo cargar la imagen. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.photoContainer}>
            {loading ? (
                <MyActivityIndicator  />
            ) : photo ? (
                /* onPress={pickImage}*/
                <TouchableOpacity >
                    <Image source={{ uri: photo }} style={styles.petPhoto} />
                </TouchableOpacity>
            ) : (
                <Button
                    appearance="ghost"
                    accessoryLeft={<Icon name="camera-outline" />}
                    onPress={pickImage}
                    disabled={true}
                >
                    Sin Foto
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    photoContainer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    petPhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
       // borderColor: '#3366FF',
    },
    // ... otros estilos
});