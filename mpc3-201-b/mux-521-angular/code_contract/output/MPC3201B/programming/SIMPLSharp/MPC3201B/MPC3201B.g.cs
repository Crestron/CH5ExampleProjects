using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace MPC3201B
{
    public interface IMPC3201B
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Power;
        event EventHandler<UIEventArgs> VolumeUp;
        event EventHandler<UIEventArgs> VolumeDown;
        event EventHandler<UIEventArgs> Mute;
        event EventHandler<UIEventArgs> Source;

        void MuteFb(MPC3201BBoolInputSigDelegate callback);
        void PowerState(MPC3201BUShortInputSigDelegate callback);
        void Bargraph(MPC3201BUShortInputSigDelegate callback);
        void SourceFb(MPC3201BUShortInputSigDelegate callback);

    }

    public delegate void MPC3201BBoolInputSigDelegate(BoolInputSig boolInputSig, IMPC3201B mPC3201B);
    public delegate void MPC3201BUShortInputSigDelegate(UShortInputSig uShortInputSig, IMPC3201B mPC3201B);

    internal class MPC3201B : IMPC3201B, IDisposable
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
                public const uint VolumeUp = 2;
                public const uint VolumeDown = 3;
                public const uint Mute = 4;

                public const uint MuteFb = 4;
            }
            internal static class Numerics
            {
                public const uint Source = 2;

                public const uint PowerState = 1;
                public const uint Bargraph = 2;
                public const uint SourceFb = 3;
            }
        }

        #endregion

        #region Construction and Initialization

        internal MPC3201B(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Power, onPower);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.VolumeUp, onVolumeUp);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.VolumeDown, onVolumeDown);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Mute, onMute);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Source, onSource);

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


        public void MuteFb(MPC3201BBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.MuteFb], this);
            }
        }

        public event EventHandler<UIEventArgs> Source;
        private void onSource(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void PowerState(MPC3201BUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.PowerState], this);
            }
        }

        public void Bargraph(MPC3201BUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Bargraph], this);
            }
        }

        public void SourceFb(MPC3201BUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.SourceFb], this);
            }
        }

        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "MPC3201B", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
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
            VolumeUp = null;
            VolumeDown = null;
            Mute = null;
            Source = null;
        }

        #endregion

    }
}
