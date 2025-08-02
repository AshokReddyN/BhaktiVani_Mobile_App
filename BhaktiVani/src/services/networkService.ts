import NetInfo from '@react-native-community/netinfo';

class NetworkService {
  private static instance: NetworkService;
  private isConnected: boolean = true;

  private constructor() {
    this.initNetworkListener();
  }

  static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  private initNetworkListener() {
    NetInfo.addEventListener(state => {
      this.isConnected = state.isConnected ?? true;
      console.log('Network status changed:', state.isConnected ? 'Connected' : 'Disconnected');
    });
  }

  /**
   * Check if device is currently connected to internet
   */
  async isConnectedToInternet(): Promise<boolean> {
    const state = await NetInfo.fetch();
    this.isConnected = state.isConnected ?? true;
    return this.isConnected;
  }

  /**
   * Get current network status
   */
  getNetworkStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Get network type (wifi, cellular, etc.)
   */
  async getNetworkType(): Promise<string> {
    const state = await NetInfo.fetch();
    return state.type || 'unknown';
  }

  /**
   * Check if device is connected to WiFi
   */
  async isConnectedToWifi(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.type === 'wifi';
  }

  /**
   * Get network strength (for cellular connections)
   */
  async getNetworkStrength(): Promise<number | null> {
    const state = await NetInfo.fetch();
    if (state.type === 'cellular' && state.details) {
      return state.details.cellularGeneration || null;
    }
    return null;
  }
}

export const networkService = NetworkService.getInstance(); 