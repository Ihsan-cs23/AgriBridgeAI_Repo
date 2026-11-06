
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { farmerColors as C } from '../../theme/farmerTheme';

export function Screen({ children, scroll = true, style, contentStyle }) {
  const Body = scroll ? ScrollView : View;
  const { width } = useWindowDimensions();
  const horizontalPadding = width < 360 ? 16 : width < 600 ? 20 : 28;

  return (
    <SafeAreaView style={[styles.screen, style]} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={C.cream}
      />

      <Body
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: horizontalPadding,
            maxWidth: width >= 600 ? 560 : undefined,
            alignSelf: width >= 600 ? 'center' : undefined,
            width: width >= 600 ? '100%' : undefined,
          },
          contentStyle,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </Body>
    </SafeAreaView>
  );
}

export function Icon({ name, size = 22, color = C.forest }) {
  const stroke = Math.max(1.7, size / 10);
  const iconStyle = {
    width: size,
    height: size,
  };

  if (name === 'profile') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.profileHead, { borderColor: color, width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15 }]} />
        <View style={[styles.profileBody, { borderColor: color, width: size * 0.62, height: size * 0.32, borderTopLeftRadius: size * 0.32, borderTopRightRadius: size * 0.32, borderWidth: stroke }]} />
      </View>
    );
  }

  if (name === 'leaf') {
    return (
      <View style={[styles.icon, iconStyle, { transform: [{ rotate: '-35deg' }] }]}>
        <View style={[styles.leafShape, { borderColor: color, borderWidth: stroke, width: size * 0.62, height: size * 0.8, borderTopLeftRadius: size * 0.6, borderBottomRightRadius: size * 0.6 }]} />
        <View style={[styles.leafStem, { backgroundColor: color, width: stroke, height: size * 0.7 }]} />
      </View>
    );
  }

  if (name === 'farm') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.farmRoof, { borderBottomColor: color, borderBottomWidth: stroke, borderLeftWidth: size * 0.28, borderRightWidth: size * 0.28 }]} />
        <View style={[styles.farmBase, { borderColor: color, borderWidth: stroke, width: size * 0.68, height: size * 0.48 }]} />
        <View style={[styles.farmDoor, { backgroundColor: color, width: stroke, height: size * 0.24 }]} />
      </View>
    );
  }

  if (name === 'scan') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.scanCorner, { borderColor: color, borderLeftWidth: stroke, borderTopWidth: stroke }]} />
        <View style={[styles.scanCorner, styles.scanBottom, { borderColor: color, borderRightWidth: stroke, borderBottomWidth: stroke }]} />
        <View style={[styles.scanLine, { backgroundColor: color, height: stroke }]} />
      </View>
    );
  }

  if (name === 'settings') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.settingsRing, { borderColor: color, borderWidth: stroke, width: size * 0.56, height: size * 0.56, borderRadius: size * 0.28 }]} />
        <View style={[styles.settingsDot, { backgroundColor: color, width: size * 0.16, height: size * 0.16, borderRadius: size * 0.08 }]} />
      </View>
    );
  }

  if (name === 'chart') {
    return (
      <View style={[styles.icon, iconStyle, { flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.08 }]}>
        <View style={{ width: size * 0.16, height: size * 0.34, backgroundColor: color, borderRadius: 2 }} />
        <View style={{ width: size * 0.16, height: size * 0.58, backgroundColor: color, borderRadius: 2 }} />
        <View style={{ width: size * 0.16, height: size * 0.82, backgroundColor: color, borderRadius: 2 }} />
      </View>
    );
  }

  if (name === 'bell') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.bellShape, { borderColor: color, borderWidth: stroke, width: size * 0.62, height: size * 0.66, borderTopLeftRadius: size * 0.32, borderTopRightRadius: size * 0.32 }]} />
        <View style={[styles.bellClapper, { backgroundColor: color, width: size * 0.2, height: stroke, bottom: size * 0.12 }]} />
        <View style={[styles.bellBase, { backgroundColor: color, width: size * 0.76, height: stroke, bottom: size * 0.22 }]} />
      </View>
    );
  }

  if (name === 'check') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.checkMark, { borderColor: color, borderRightWidth: stroke, borderBottomWidth: stroke, width: size * 0.38, height: size * 0.68, transform: [{ rotate: '45deg' }] }]} />
      </View>
    );
  }

  if (name === 'arrow') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.arrowLine, { backgroundColor: color, height: stroke, width: size * 0.7 }]} />
        <View style={[styles.arrowHead, { borderColor: color, borderRightWidth: stroke, borderTopWidth: stroke, width: size * 0.25, height: size * 0.25, transform: [{ rotate: '45deg' }] }]} />
      </View>
    );
  }

  if (name === 'clock') {
    return (
      <View style={[styles.clockShape, iconStyle, { borderColor: color, borderWidth: stroke }]}>
        <View style={[styles.clockHand, { backgroundColor: color, width: stroke, height: size * 0.28 }]} />
        <View style={[styles.clockMinute, { backgroundColor: color, width: size * 0.25, height: stroke }]} />
      </View>
    );
  }

  if (name === 'info') {
    return (
      <View style={[styles.infoIcon, iconStyle, { borderColor: color, borderWidth: stroke }]}>
        <Text style={[styles.infoText, { color, fontSize: size * 0.66 }]}>i</Text>
      </View>
    );
  }

  if (name === 'logout') {
    return (
      <View style={[styles.icon, iconStyle]}>
        <View style={[styles.logoutDoor, { borderColor: color, borderLeftWidth: stroke, borderTopWidth: stroke, borderBottomWidth: stroke, width: size * 0.35, height: size * 0.62 }]} />
        <View style={[styles.logoutArrow, { backgroundColor: color, height: stroke, width: size * 0.52 }]} />
        <View style={[styles.logoutArrowHead, { borderColor: color, borderRightWidth: stroke, borderTopWidth: stroke, width: size * 0.22, height: size * 0.22, transform: [{ rotate: '45deg' }] }]} />
      </View>
    );
  }

  return <View style={[styles.icon, iconStyle]} />;
}

export function TopBar({
  title = 'AgriBridge AI',
  subtitle,
  right,
  onBack,
}) {
  return (
    <View style={styles.topBar}>
      <View style={styles.brandMark}>
        <Image
          source={require('../../../assets/images/agribridge-logo.png')}
          style={styles.brandLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.brandCopy}>
        <Text style={styles.brandName}>{title}</Text>
        {!!subtitle && (
          <Text style={styles.topSubtitle}>{subtitle}</Text>
        )}
      </View>

      {right && <View style={styles.topBarRight}>{right}</View>}
    </View>
  );
}

export function Eyebrow({ children, style }) {
  return (
    <Text style={[styles.eyebrow, style]}>
      {children}
    </Text>
  );
}

export function Heading({ children, style }) {
  return (
    <Text style={[styles.heading, style]}>
      {children}
    </Text>
  );
}

export function Subheading({ children, style }) {
  return (
    <Text style={[styles.subheading, style]}>
      {children}
    </Text>
  );
}

export function SectionHeading({ title, action, onAction }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action && (
        <Pressable onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && { opacity: 0.45 },
        pressed && { opacity: 0.86 },
        style,
      ]}
    >
      <Text style={styles.primaryButtonText}>
        {title}
      </Text>

      <Text style={styles.primaryArrow}>→</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      <Text style={styles.secondaryButtonText}>
        {title}
      </Text>
    </Pressable>
  );
}

export function Panel({ children, style }) {
  return (
    <View style={[styles.panel, style]}>
      {children}
    </View>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        placeholderTextColor="#9AA69E"
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          styles.input,
          multiline && {
            minHeight: 100,
            paddingTop: 14,
          },
        ]}
      />
    </View>
  );
}

export function Tag({ children, tone = 'green' }) {
  const tagColors = {
    green: {
      backgroundColor: C.sage,
      color: C.forest,
    },
    amber: {
      backgroundColor: '#FFF2DF',
      color: '#98651F',
    },
    red: {
      backgroundColor: '#FCEBE8',
      color: '#A94E43',
    },
  };

  const selected = tagColors[tone] || tagColors.green;

  return (
    <View style={[
      styles.tag,
      { backgroundColor: selected.backgroundColor },
    ]}>
      <Text style={[
        styles.tagText,
        { color: selected.color },
      ]}>
        {children}
      </Text>
    </View>
  );
}

export function MenuItem({
  icon,
  title,
  detail,
  onPress,
  danger,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={[
        styles.menuIcon,
        danger && { backgroundColor: '#FCEBE8' },
      ]}>
        {typeof icon === 'string' ? (
          <Text style={[
            styles.menuIconText,
            danger && { color: C.red },
          ]}>
            {icon}
          </Text>
        ) : icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[
          styles.menuTitle,
          danger && { color: C.red },
        ]}>
          {title}
        </Text>

        {!!detail && (
          <Text style={styles.menuDetail}>{detail}</Text>
        )}
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.cream,
  },

  content: {
    paddingTop: 16,
    paddingBottom: 36,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
    marginBottom: 24,
    position: 'relative',
    gap: 11,
  },

  topBarRight: {
    position: 'absolute',
    right: 0,
    top: 8,
  },

  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  brandLogo: {
    width: 38,
    height: 38,
  },

  brandName: {
    color: C.forestDeep,
    fontSize: 19,
    fontWeight: '900',
  },

  brandCopy: {
    flex: 1,
    minWidth: 0,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  profileHead: {
    borderWidth: 1.7,
    position: 'absolute',
    top: '12%',
  },

  profileBody: {
    position: 'absolute',
    bottom: '10%',
  },

  leafShape: {
    position: 'absolute',
    top: '5%',
    left: '18%',
  },

  leafStem: {
    position: 'absolute',
    bottom: '3%',
    transform: [{ rotate: '-25deg' }],
  },

  farmRoof: {
    position: 'absolute',
    top: '10%',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  farmBase: {
    position: 'absolute',
    bottom: '8%',
  },

  farmDoor: {
    position: 'absolute',
    bottom: '8%',
  },

  scanCorner: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '35%',
    height: '35%',
  },

  scanBottom: {
    top: undefined,
    left: undefined,
    right: '5%',
    bottom: '5%',
  },

  scanLine: {
    position: 'absolute',
    width: '65%',
    top: '48%',
  },

  settingsRing: {
    position: 'absolute',
  },

  settingsDot: {
    position: 'absolute',
  },

  bellShape: {
    position: 'absolute',
    top: '12%',
  },

  bellClapper: {
    position: 'absolute',
    borderRadius: 4,
  },

  bellBase: {
    position: 'absolute',
    borderRadius: 4,
  },

  checkMark: {
    position: 'absolute',
    top: '7%',
  },

  arrowLine: {
    position: 'absolute',
    left: '7%',
  },

  arrowHead: {
    position: 'absolute',
    right: '7%',
  },

  clockShape: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },

  clockHand: {
    position: 'absolute',
    top: '22%',
  },

  clockMinute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },

  infoIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  infoText: {
    fontWeight: '900',
    lineHeight: 16,
  },

  logoutDoor: {
    position: 'absolute',
    left: '12%',
  },

  logoutArrow: {
    position: 'absolute',
    right: '5%',
  },

  logoutArrowHead: {
    position: 'absolute',
    right: '5%',
  },

  topSubtitle: {
    color: C.muted,
    fontSize: 11,
    marginTop: 2,
  },

  eyebrow: {
    color: C.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  heading: {
    color: C.ink,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  subheading: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 13,
  },

  sectionTitle: {
    color: C.ink,
    fontSize: 17,
    fontWeight: '800',
  },

  sectionAction: {
    color: C.green,
    fontSize: 12,
    fontWeight: '800',
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: C.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  primaryButtonText: {
    color: C.white,
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },

  primaryArrow: {
    color: C.lime,
    fontSize: 22,
  },

  secondaryButton: {
    minHeight: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  secondaryButtonText: {
    color: C.forest,
    fontSize: 13,
    fontWeight: '800',
  },

  panel: {
    backgroundColor: C.white,
    borderRadius: 22,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E9EDE6',
  },

  fieldWrap: {
    marginTop: 17,
  },

  fieldLabel: {
    color: C.ink,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },

  input: {
    minHeight: 51,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    color: C.ink,
    fontSize: 14,
  },

  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
  },

  tagText: {
    fontSize: 10,
    fontWeight: '800',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    gap: 12,
  },

  menuIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: C.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIconText: {
    color: C.forest,
    fontSize: 17,
    fontWeight: '800',
  },

  menuTitle: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '800',
  },

  menuDetail: {
    color: C.muted,
    fontSize: 11,
    marginTop: 3,
  },

  chevron: {
    color: '#9BA79F',
    fontSize: 25,
  },
});
