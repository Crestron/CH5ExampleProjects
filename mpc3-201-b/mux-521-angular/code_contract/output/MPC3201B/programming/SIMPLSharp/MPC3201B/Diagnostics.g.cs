using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace MPC3201B
{
    /// <summary>
    /// Debug messages from the user interface
    /// </summary>
    /// <summary>
    /// Error messages from the user interface
    /// </summary>
    /// <summary>
    /// Sends direct commands to the user interface
    /// </summary>
    public interface IDiagnostics
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Debug;
        event EventHandler<UIEventArgs> Error;

        void Command(DiagnosticsStringInputSigDelegate callback);

    }

    public delegate void DiagnosticsStringInputSigDelegate(StringInputSig stringInputSig, IDiagnostics diagnostics);

    internal class Diagnostics : IDiagnostics, IDisposable
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
            internal static class Strings
            {
                public const uint Debug = 1;
                public const uint Error = 2;

                public const uint Command = 3;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Diagnostics(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureStringEvent(controlJoinId, Joins.Strings.Debug, onDebug);
            ComponentMediator.ConfigureStringEvent(controlJoinId, Joins.Strings.Error, onError);

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

        public event EventHandler<UIEventArgs> Debug;
        private void onDebug(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Debug;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Error;
        private void onError(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Error;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Command(DiagnosticsStringInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].StringInput[Joins.Strings.Command], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Diagnostics", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Debug = null;
            Error = null;
        }

        #endregion

    }
}
