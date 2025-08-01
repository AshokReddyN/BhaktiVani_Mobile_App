import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';
import { Theme, FontFamily } from '../contexts/SettingsContext';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const { settings, updateSettings } = useSettings();

  const handleThemeChange = (theme: Theme) => updateSettings({ theme });
  const handleFontFamilyChange = (fontFamily: FontFamily) => updateSettings({ fontFamily });
  const handleFontSizeChange = (increment: number) => {
    updateSettings({ fontSize: Math.max(12, settings.fontSize + increment) });
  };
  const handleLineHeightChange = (increment: number) => {
    updateSettings({ lineHeight: Math.max(1.2, settings.lineHeight + increment) });
  };
  const handleMarginChange = (value: number) => updateSettings({ margin: value });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Display Settings</Text>

          {/* Theme Settings */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Theme</Text>
            <View style={styles.buttonGroup}>
              <Button title="Light" onPress={() => handleThemeChange('light')} />
              <Button title="Sepia" onPress={() => handleThemeChange('sepia')} />
              <Button title="Dark" onPress={() => handleThemeChange('dark')} />
            </View>
          </View>

          {/* Font Size Settings */}
          <View style={styles.settingRow}>
             <Text style={styles.settingLabel}>Font Size</Text>
             <View style={styles.buttonGroup}>
                <Button title="-" onPress={() => handleFontSizeChange(-2)}/>
                <Text style={styles.valueText}>{settings.fontSize}</Text>
                <Button title="+" onPress={() => handleFontSizeChange(2)}/>
             </View>
          </View>

          {/* Line Spacing */}
          <View style={styles.settingRow}>
             <Text style={styles.settingLabel}>Line Spacing</Text>
             <View style={styles.buttonGroup}>
                <Button title="-" onPress={() => handleLineHeightChange(-0.1)}/>
                <Text style={styles.valueText}>{settings.lineHeight.toFixed(1)}</Text>
                <Button title="+" onPress={() => handleLineHeightChange(0.1)}/>
             </View>
          </View>

          {/* Margins */}
           <View style={styles.settingRow}>
             <Text style={styles.settingLabel}>Margins</Text>
             <View style={styles.buttonGroup}>
                <Button title="Narrow" onPress={() => handleMarginChange(10)}/>
                <Button title="Medium" onPress={() => handleMarginChange(20)}/>
                <Button title="Wide" onPress={() => handleMarginChange(30)}/>
             </View>
          </View>

          {/* Font Family */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Font</Text>
            <View style={styles.buttonGroup}>
              <Button title="Serif" onPress={() => handleFontFamilyChange('serif')} />
              <Button title="Sans-Serif" onPress={() => handleFontFamilyChange('sans-serif')} />
            </View>
          </View>

          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  valueText: {
      marginHorizontal: 10,
      fontSize: 16
  }
});

export default SettingsModal;
