// Componentes reutilizables.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, UserModel } from '../models/User';

interface UserListItemProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

/**
 * Componente para mostrar un usuario en la lista
 */
const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{user.userName}</Text>
                <Text style={styles.id}>ID: {user.numIdentificacionUser}</Text>
                {user.dateCreate && (
                    <Text style={styles.date}>
                        Fecha: {UserModel.formatDate(user.dateCreate)}
                    </Text>
                )}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => onEdit(user)}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => onDelete(user.id!)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    id: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 8,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginBottom: 4,
    },
    editButton: {
        backgroundColor: '#4b70e2',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },

});

export default UserListItem;