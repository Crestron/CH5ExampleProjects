using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace MPC3201B
{
    /// <summary>
    /// Common Interface for Root Contracts.
    /// </summary>
    public interface IContract
    {
        object UserObject { get; set; }
        void AddDevice(BasicTriListWithSmartObject device);
        void RemoveDevice(BasicTriListWithSmartObject device);
    }

    /// <summary>
    /// Crestron MPC3-201-B
    /// </summary>
    public class Contract : IContract, IDisposable
    {
        #region Components

        private ComponentMediator ComponentMediator { get; set; }

        public MPC3201B.IDiagnostics Diagnostics { get { return (MPC3201B.IDiagnostics)InternalDiagnostics; } }
        private MPC3201B.Diagnostics InternalDiagnostics { get; set; }

        public MPC3201B.IAppleTV AppleTV { get { return (MPC3201B.IAppleTV)InternalAppleTV; } }
        private MPC3201B.AppleTV InternalAppleTV { get; set; }

        public MPC3201B.IMPC3201B MPC3201B { get { return (MPC3201B.IMPC3201B)InternalMPC3201B; } }
        private MPC3201B.MPC3201B InternalMPC3201B { get; set; }

        #endregion

        #region Construction and Initialization

        public Contract()
            : this(new List<BasicTriListWithSmartObject>().ToArray())
        {
        }

        public Contract(BasicTriListWithSmartObject device)
            : this(new [] { device })
        {
        }

        public Contract(BasicTriListWithSmartObject[] devices)
        {
            if (devices == null)
                throw new ArgumentNullException("Devices is null");

            ComponentMediator = new ComponentMediator();

            InternalDiagnostics = new MPC3201B.Diagnostics(ComponentMediator, 1);
            InternalAppleTV = new MPC3201B.AppleTV(ComponentMediator, 2);
            InternalMPC3201B = new MPC3201B.MPC3201B(ComponentMediator, 3);

            for (int index = 0; index < devices.Length; index++)
            {
                AddDevice(devices[index]);
            }
        }

        #endregion

        #region Standard Contract Members

        public object UserObject { get; set; }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            InternalDiagnostics.AddDevice(device);
            InternalAppleTV.AddDevice(device);
            InternalMPC3201B.AddDevice(device);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            InternalDiagnostics.RemoveDevice(device);
            InternalAppleTV.RemoveDevice(device);
            InternalMPC3201B.RemoveDevice(device);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            InternalDiagnostics.Dispose();
            InternalAppleTV.Dispose();
            InternalMPC3201B.Dispose();
            ComponentMediator.Dispose(); 
        }

        #endregion

    }
}
