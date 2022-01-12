#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
// CHANGE: @react-native-community/push-notification-ios
#import <UserNotifications/UNUserNotificationCenter.h>
// END CHANGE: @react-native-community/push-notification-ios

// CHANGE: react-native-app-auth
#import "RNAppAuthAuthorizationFlowManager.h"
// END CHANGE: react-native-app-auth

// CHANGE: react-native-app-auth (, RNAppAuthAuthorizationFlowManager)
// CHANGE: @react-native-community/push-notification-ios (, UNUserNotificationCenterDelegate)
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate, RNAppAuthAuthorizationFlowManager>
// END CHANGE: @react-native-community/push-notification-ios
// END CHANGE: react-native-app-auth

@property (nonatomic, strong) UIWindow *window;

// CHANGE: react-native-app-auth
@property (nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;
// END CHANGE: react-native-app-auth

@end
