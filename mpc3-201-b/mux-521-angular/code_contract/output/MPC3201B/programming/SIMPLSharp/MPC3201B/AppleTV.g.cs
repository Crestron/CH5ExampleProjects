using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace MPC3201B
{
    public interface IAppleTV
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Power;
        event EventHandler<UIEventArgs> Up;
        event EventHandler<UIEventArgs> Down;
        event EventHandler<UIEventArgs> Left;
        event EventHandler<UIEventArgs> Right;
        event EventHandler<UIEventArgs> Ok;
        event EventHandler<UIEventArgs> Back;
        event EventHandler<UIEventArgs> TV;
        event EventHandler<UIEventArgs> PlayPause;
        event EventHandler<UIEventArgs> VolumeUp;
        event EventHandler<UIEventArgs> VolumeDown;
        event EventHandler<UIEventArgs> Mute;


    }

    public delegate void AppleTVBoolInputSigDelegate(BoolInputSig boolInputSig, IAppleTV appleTV);

    internal class AppleTV : IAppleTV, IDisposable
    {
        #region Standard CH5 Component members

        private ComponentMediator ComponentMediator { get; set; }

        public object UserObject { get; set; }

        public uint ControlJoinId { get; private set; }

        private IList<BasicTriListWithSmartObject> _devices;
        public IList<BasicTriListWithSmartObject> Devices { get { return _devices; } }

        #endregion

        #region Joins

        private static class Joins
        {
            internal static class Booleans
            {
                public const uint Power = 1;
                public const uint Up = 2;
                public const uint Down = 3;
                public const uint Left = 4;
                public const uint Right = 5;
                public const uint Ok = 6;
                public const uint Back = 7;
                public const uint TV = 8;
                public const uint PlayPause = 9;
                public const uint VolumeUp = 10;
                public const uint VolumeDown = 11;
                public const uint Mute = 12;

            }
        }

        #endregion

        #region Construction and Initialization

        internal AppleTV(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Power, onPower);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Up, onUp);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Down, onDown);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Left, onLeft);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Right, onRight);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Ok, onOk);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Back, onBack);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.TV, onTV);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.PlayPause, onPlayPause);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.VolumeUp, onVolumeUp);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.VolumeDown, onVolumeDown);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Mute, onMute);

        }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            Devices.Add(device);
            ComponentMediator.HookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            Devices.Remove(device);
            ComponentMediator.UnHookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        #endregion

        #region CH5 Contract

        public event EventHandler<UIEventArgs> Power;
        private void onPower(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Power;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Up;
        private void onUp(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Up;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Down;
        private void onDown(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Down;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Left;
        private void onLeft(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Left;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Right;
        private void onRight(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Right;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Ok;
        private void onOk(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Ok;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Back;
        private void onBack(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Back;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> TV;
        private void onTV(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = TV;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> PlayPause;
        private void onPlayPause(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = PlayPause;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> VolumeUp;
        private void onVolumeUp(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = VolumeUp;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> VolumeDown;
        private void onVolumeDown(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = VolumeDown;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Mute;
        private void onMute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "AppleTV", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Power = null;
            Up = null;
            Down = null;
            Left = null;
            Right = null;
            Ok = null;
            Back = null;
            TV = null;
            PlayPause = null;
            VolumeUp = null;
            VolumeDown = null;
            Mute = null;
        }

        #endregion

    }
}
