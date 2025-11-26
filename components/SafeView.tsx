import React from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeViewProps extends ViewProps {
    children: React.ReactNode;
}

export function SafeView({ children, style, ...props }: SafeViewProps) {
    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                },
                style,
            ]}
            edges={['top', 'bottom', 'left', 'right']}
            {...props}
        >
            {children}
        </SafeAreaView>
    );
}
